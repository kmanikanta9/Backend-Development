

const express = require('express')
const taskRouter = require('./routes/task.routes')

const app = express()
app.use(express.json())

app.get('/test',(req,res)=>{
    res.status(201).json({msg:"This is Test Route"})
})

app.use('/tasks',taskRouter)

app.use((req,res)=>{
    res.status(404).json({msg:"404 Not Found"})
})

app.listen(6000,()=>{
    console.log("Server started at port 6000")
})