let express = require("express");
const connectToDB = require("./configs/db");
const vehicleRouter = require("./routes/vehicleRoutes");
let app = express();
app.use(express.json());

connectToDB();

app.use("/vehicle",vehicleRouter)

app.get("*", (req, res) => {
  res.status(404).json({ Error: "404 , Route is not found.." });
});

app.listen(3000, () => {
  console.log("Server is Running on the Port 3000..");
});
