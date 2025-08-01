const express = require("express");
const adminRouter = require("./routes/adminRouter");
const hrRouter = require("./routes/hrRouter");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const roleCheckMiddleware = require("./middlewares/roleCheckMiddleware");

let app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.use(roleCheckMiddleware)
// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Running" });
});
// admin router
app.use("/admin", adminRouter);
// hr router
app.use("/hr", hrRouter);

// any undefined route
app.get("*", (req, res) => {
  res.status(404).json({ message: "404, Route is not found.." });
});
app.listen(3000, () => {
  console.log("Server is Running on the 3000 port");
});
