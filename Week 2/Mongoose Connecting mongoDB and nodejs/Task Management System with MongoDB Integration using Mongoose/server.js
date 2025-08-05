
const express = require('express')
const connectToDB = require('./configs/mongodb.config')
const taskRouter = require('./routes/task.routes')

connectToDB()
const app = express()
app.use(express.json())
app.get('/test',(req,res)=>{
    res.json({msg:"This is test route"})
})
app.use('/tasks',taskRouter)
app.listen(3000,()=>{
    console.log("Server started at port 3000.")
})