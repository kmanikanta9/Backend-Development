
const express = require('express')
const connectToDB = require('./configs/vehicle.config')
const vehicleRouter = require('./routes/vehicle.routes')


const app = express()
app.use(express.json())

connectToDB()


app.use('/vehicle',vehicleRouter)
app.use((req,res)=>{
    res.status(404).json({msg:"404 not found"})
})
app.listen(4000,()=>{
    console.log("Server started the port 4000")
})