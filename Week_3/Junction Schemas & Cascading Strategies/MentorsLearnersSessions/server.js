
let express = require("express")
const connectToDb = require("./configs/db")
const mentorRouter = require("./routes/mentorRoutes")
const learnerRouter = require("./routes/learnerRoutes")
const sessionRouter = require("./routes/sessionRoutes")
let app = express()
app.use(express.json())

connectToDb()

// test route 
app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is working.."})
})


// mentor routes 
app.use("/mentor",mentorRouter)
// learner routes 
app.use("/learner",learnerRouter)
// session routes 
app.use("/session",sessionRouter)



// unhandled Route 
app.get((req,res)=>{
    res.status(404).json({message:"404 , Route is not found.."})
})

app.listen(3000,()=>{
    console.log("Server is Running on the 3000 port")
})