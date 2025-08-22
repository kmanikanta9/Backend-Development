const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
dotenv.config();
const connectToData = require('./configs/db');
const userRouter = require('./routes/userRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const app = express();
app.use(express.json());
app.use(cors())

//console.log(process.env.PORT)
connectToData()
app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is on Fullstack"});

})

app.use("/users",userRouter);
app.use("/resources",resourceRouter);

app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!!1"});
})

app.listen(process.env.PORT,()=>{
	console.log(`App is working on the Route ${process.env.PORT}`)
})
