let express = require("express")
const connectToDb = require("./configs/db")
const lmsRouter = require("./routes/lmsRoutes")
let app = express()
app.use(express.json())
connectToDb() // connected to db

// test route 
app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working.."})
})
// all the routes of students , courses , and enrollments
app.use("/lms",lmsRouter)
// any unhandled route 
app.get("*",(req,res)=>{
    res.status(404).json({Error:"404, Route is not Found.."})
})




app.listen(3000,()=>{
    console.log("Server is Working on 3000 port...")
})