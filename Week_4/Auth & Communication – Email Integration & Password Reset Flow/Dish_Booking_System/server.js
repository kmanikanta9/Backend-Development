let express = require("express")
const connectToDb = require("./configs/db")
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")
const chefRouter = require("./routes/chefRoutes")
const dishRouter = require("./routes/dishRoutes")
const orderRouter = require("./routes/orderRoutes")
let app = express()
app.use(express.json())
require("dotenv").config()
connectToDb()
let port = process.env.port || 3000

app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working"})
})

// user routes 
app.use("/user",userRouter)
// admin routes 
app.use("/admin",adminRouter)
// chef routes 
app.use("/chef",chefRouter)
// dish Routes 
app.use("/dish",dishRouter)
// order routes 
app.use("/order",orderRouter)

// unHandled route
app.use((req,res)=>{
    res.status(404).json({message:"404,Route is Not Found"})
})

app.listen(port,()=>{
    console.log(`Server is Running on the ${port} port`)
})