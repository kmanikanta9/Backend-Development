

const express = require('express')
const connectToDB = require('./configs/one.configs')
const userRouter = require('./routes/oneuser.routes')
const profileRouter = require('./routes/profile.routes')

const app = express()

app.use(express.json())
connectToDB()

app.use('/users',userRouter)
app.use('/profile',profileRouter)
app.listen(4000,()=>{
    console.log("Server started")
})