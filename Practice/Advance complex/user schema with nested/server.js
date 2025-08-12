

const express = require('express')
const connectToDB = require('./configs/user.configs')
const userRouter = require('./routes/user.routes')


const app = express()
app.use(express.json())
connectToDB()

app.use('/users',userRouter)
app.use((req,res)=>{
    res.status(404).json({msg:"Unknown Route 404 not found"})
})
app.listen(3000,()=>{
    console.log("Server started the port 3000")
})