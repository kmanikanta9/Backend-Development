

const express = require('express')
const connectToDB = require('./configs/task.config')
const taskRouter = require('./routes/tasks.routes')

connectToDB()

const app = express()
app.use(express.json())
app.use('/tasks',taskRouter)

app.listen(4000,()=>{
    console.log("Server Started at port 4000.")
})