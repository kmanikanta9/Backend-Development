let express = require("express")
const connectToDb = require("./configs/db")
const memberRouter = require("./routes/memberRoutes")
const bookRouter = require("./routes/bookRoutes")
let app = express()
app.use(express.json())

connectToDb()

app.get('/test',(req,res)=>{
    return res.status(200).json({msg:"Test Route is Working."})
})
app.use('/member',memberRouter)
app.use('/book',bookRouter)

app.get((req,res)=>{
    return res.status(404).json({Error:"404 , Route is Not Working.."})
})

app.listen(3000 , ()=>{
    console.log("Server is Running on the 3000 port..")
})