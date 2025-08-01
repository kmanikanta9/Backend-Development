


const express = require('express')
const todoRouter = require('./routes/todo.routes')

const app = express()
app.use(express.json())

app.get('/test',(req,res)=>{
    res.json({msg:"This is the Test Route"})
})

app.use('/todos',todoRouter)


app.use((req,res)=>{
    res.json({msg:"404 Not Found"})
})


app.listen(4000,()=>{
    console.log("Server started at the port 4000")
})

