let express = require("express");
let app = express();
app.use(express.json());
const { adminRouter } = require("./routes/adminRouter");
const { readerRouter } = require("./routes/readerRouter");
const { logerMiddleware } = require("./middlewares/loggerMiddleware");
app.use(logerMiddleware);
// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Running.." });
});

//admin router
app.use("/admin", adminRouter);

// reader router
app.use("/reader", readerRouter);

// any undefined route
app.get((req, res) => {
  res.status(404).json({ message: "404 Route is not found.." });
});
// port
app.listen(3000, () => {
  console.log("Server is running on the 3000 port..");
});
