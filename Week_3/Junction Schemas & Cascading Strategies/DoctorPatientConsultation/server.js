const connectToDb = require("./configs/db");

let express = require("express");
const doctorRouter = require("./routes/doctorRoutes");
const patientRouter = require("./routes/patientRoutes");
const consultationRouter = require("./routes/consultationRoutes");
let app = express()
app.use(express.json())
connectToDb()

// test route
app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working.."})
})

// doctor Routes 
app.use("/doctor",doctorRouter)
// patient Routes 
app.use("/patient",patientRouter) 
// consultation routes 
app.use("/consultation",consultationRouter)

// unhandled route 
app.get((req,res)=>{
    res.status(404).json({Error:"404 , Route is not found.."})
})

app.listen(3000,()=>{
    console.log("Server is Running on the port 3000...")
})