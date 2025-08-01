
const express =require('express')
const ticketRouter = require('./routes/ticket.routes')
const dataCheckMiddleware = require('./middlewares/logger')
const app = express()
app.use(express.json())

app.use(dataCheckMiddleware)
app.get('/test',(req,res)=>{
    res.status(200).json({msg:"This is test route"})
})

app.use('/tickets',ticketRouter)

app.use((req,res)=>{
    res.json(404).json({msg:"404 not found"})
})

app.listen(3000,()=>{
    console.log("Server has started the port 3000")
})

