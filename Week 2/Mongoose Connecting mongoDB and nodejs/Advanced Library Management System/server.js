
const express = require('express')
const libraryRouter = require('./routes/library.routes')
const connectToDB = require('./configs/library.config')

connectToDB()
const app = express()

app.use(express.json())

app.use('/library',libraryRouter)
app.listen(5000,()=>{
    console.log("Server started at port 5000")
})