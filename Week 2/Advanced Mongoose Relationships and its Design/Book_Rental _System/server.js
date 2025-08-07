let express = require("express");
const connectToDb = require("./configs/db");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
let app = express();
app.use(express.json());

connectToDb();

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is working" });
});
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.get((req, res) => {
  res.status(404).json({ Error: "404 , Route is not found.." });
});
app.listen(3000, () => {
  console.log("Server is Running on the port 3000...");
});
