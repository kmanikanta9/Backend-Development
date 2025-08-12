const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/rbac-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const bookingSchema = new mongoose.Schema({
  serviceName: String,
  date: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// Middleware: Authenticate JWT
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    return res.status(400).json({ error: "Invalid token" });
  }
}

// Middleware: Role check
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    next();
  };
}

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Email already in use" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, user: { name: user.name, role: user.role } });
});

// USER ROUTES
// Book a service
app.post("/bookings", authMiddleware, authorizeRoles("user"), async (req, res) => {
  const { serviceName, date } = req.body;
  const booking = await Booking.create({ serviceName, date, userId: req.user.id });
  res.status(201).json({ message: "Booking created", booking });
});

// View own bookings
app.get("/bookings", authMiddleware, authorizeRoles("user"), async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json({ bookings });
});

// Cancel a booking
app.delete("/bookings/:id", authMiddleware, authorizeRoles("user"), async (req, res) => {
  const booking = await Booking.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json({ message: "Booking cancelled" });
});

// ADMIN ROUTES
// View all bookings
app.get("/admin/bookings", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  const bookings = await Booking.find().populate("userId", "name email");
  res.json({ bookings });
});

// Delete any booking
app.delete("/admin/bookings/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json({ message: "Booking deleted by admin" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
