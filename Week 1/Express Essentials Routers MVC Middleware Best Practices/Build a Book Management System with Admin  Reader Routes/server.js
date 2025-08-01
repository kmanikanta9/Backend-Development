

const express = require('express')
const adminRouter = require('./routes/admin.routes')

const app = express()
app.use(express.json())


app.get('/test',(req,res)=>{
    res.status(201).json({msg:"This is test route."})
})
app.use('/admin',adminRouter)

app.listen(4000,()=>{
    console.log("Server started the port 4000")
})