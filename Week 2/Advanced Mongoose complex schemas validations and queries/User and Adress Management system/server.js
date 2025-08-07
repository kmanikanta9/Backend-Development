

const express = require('express')
const UserModel = require('./models/user.model')
const connectToDB = require('./configs/user.config')
const userRouter = require('./routes/user.routes')

connectToDB()
const app = express()

app.use(express.json())
app.use('/users',userRouter)
app.listen(3000,()=>{
    console.log("Server started at 3000")
})