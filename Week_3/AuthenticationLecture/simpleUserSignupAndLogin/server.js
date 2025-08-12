let express = require("express");
const connectToDB = require("./configs/db");
const userRouter = require("./routes/userRoutes");
let app = express();
app.use(express.json());

connectToDB();

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working.." });
});
// user Routes 
app.use("/users",userRouter)
app.use((req, res) => {
  res.status(404).json({ message: "404 , Route is not found.." });
});

app.listen(3000, () => {
  console.log("Server is not Working..");
});
