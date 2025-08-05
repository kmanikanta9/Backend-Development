


const express = require('express')
const limiter = require('./middlewares/rateLimiter')
const appRouter = require('./router/rate.routes')

const app= express()
app.use(express.json())


app.use('/api',appRouter)
app.use((req,res)=>{
    res.status(404).json({msg:"404 Not Found"})
})
app.listen(3000,()=>{
    console.log("Server started 3000")
})