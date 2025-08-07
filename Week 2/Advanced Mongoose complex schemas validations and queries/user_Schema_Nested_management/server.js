let express = require("express")
const connectToDB = require("./configs/db")
const userRouter = require("./routes/userRouter")
let app = express()
app.use(express.json())

connectToDB()// connecting To DB




app.get("/test",(req,res)=>{
    res.status(201).json({message:"Test Route is Running.."})
})

// users route 
app.use("/users",userRouter)

app.get("*",(req,res)=>{
    res.status(404).json({message:"404,Route Not Found.."})
})

app.listen(3000,()=>{
    console.log("Server is Running on the 3000 port..")
})