

const express=require('express')
const readFiles = require('./read')
const app=express()

const os = require('node:os');
const dns=require('dns')

app.get("/test",(req,res)=>{
    res.send("Test route is working!")
})
app.get("/readfile",(req,res)=>{
    res.send(readFiles())
})
app.get("/systemdetails",(req,res)=>{
    const platform =os.platform()
    const totalMemoryGB=(os.totalmem()/(1024**3)).toFixed(2)
    const freeMemoryGB=(os.freemem()/(1024**3)).toFixed(2)
    const cpuModel=os.cpus()[0].model

    res.send({
        platform:platform,
        totalMemoryGB:`${totalMemoryGB} GB`,
        freeMemoryGB:`${freeMemoryGB} GB`,
        cpuModel:cpuModel
    })
})
app.get("/getip",(res,req)=>{
    dns.lookup('masaischool.com',(err,address,f)=>{
        if(err){
            return res.send({err:'Failed to get IP Address'})
        }
        res.json({hostname:'masaischool.com',ipAddress:address})
    })
})
app.listen(4000,()=>{
    console.log("Server start the port 4000")
})