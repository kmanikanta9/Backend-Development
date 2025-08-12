require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/auth_system");

// MODELS
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
const User = mongoose.model("User", userSchema);

const tokenBlacklistSchema = new mongoose.Schema({
  token: String,
  blacklistedAt: { type: Date, default: Date.now },
});
const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
  startedAt: { type: Date, default: Date.now },
  expiresAt: Date,
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);

// UTILS
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

// MIDDLEWARES
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Token missing");

  const isBlacklisted = await TokenBlacklist.findOne({ token });
  if (isBlacklisted) return res.status(403).send("Token blacklisted");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).send("Forbidden");
  next();
};

const checkSubscription = (plans) => async (req, res, next) => {
  const subscription = await Subscription.findOne({ userId: req.user.id });
  if (!subscription || !plans.includes(subscription.plan)) {
    return res.status(403).send("Upgrade required");
  }
  next();
};

// AUTH ROUTES
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hash, role });
  await user.save();
  res.send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send("Invalid credentials");
  const token = generateToken(user);
  res.json({ token });
});

app.post("/logout", authenticate, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  await TokenBlacklist.create({ token });
  res.send("Logged out");
});

// SUBSCRIPTION ROUTES
app.post("/subscribe", authenticate, async (req, res) => {
  const { plan } = req.body;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + (plan === "pro" ? 1 : 3));
  await Subscription.findOneAndUpdate(
    { userId: req.user.id },
    { plan, startedAt: new Date(), expiresAt },
    { upsert: true }
  );
  res.send("Subscribed");
});

// CONTENT ROUTES
app.get("/content/free", authenticate, checkSubscription(["free", "pro", "enterprise"]), (req, res) => {
  res.send("Free content");
});

app.get("/content/pro", authenticate, checkSubscription(["pro", "enterprise"]), (req, res) => {
  res.send("Pro content");
});

app.get("/content/enterprise", authenticate, checkSubscription(["enterprise"]), (req, res) => {
  res.send("Enterprise content");
});

// ADMIN ROUTE
app.get("/admin", authenticate, authorizeRoles("admin"), (req, res) => {
  res.send("Admin access granted");
});

// SERVER
app.listen(3000, () => console.log("Server running on port 3000"));
