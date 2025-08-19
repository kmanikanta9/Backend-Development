let express = require("express")
const connectToDb = require("./configs/db")
const userRouter = require("./routes/userRoutes")
let app = express()
app.use(express.json())
require("dotenv").config()

connectToDb()

let port = process.env.PORT  || 3000

app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working"})
})

app.use("/user",userRouter)


app.use((req,res)=>{
    res.status(404).json({message:"404, Route is Not Found"})
})



app.listen(port,()=>{
    console.log(`Server is Running on the ${port} port.`)
})

