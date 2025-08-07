let express = require("express");
const connectToDb = require("./configs/db");
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
let app = express();
app.use(express.json());

connectToDb();

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working" });
});

app.use("/user", userRouter);

app.use("/profile", profileRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found.." });
});

app.listen(3000, () => {
  console.log("Server is running on the port 3000..");
});
