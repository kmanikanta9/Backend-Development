

const express=require('express')
const fileurl = require('./urlparser')
const filePaths = require('./fileinfo')
const app=express()

app.get("/test",(req,res)=>{
    res.send("Test route is working!")
})
app.get("/parseurl",(req,res)=>{
    const fullUrl="/parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks"
    if(!fullUrl){
        return res.json({error:"URL parameter is required"})

    }
    try {
        const result=fileurl(fullUrl)
        res.json(result)
    } catch (error) {
        res.status(500).json({error:"Failed to parse url"})
    }
})
app.get("/fileinfo",(req,res)=>{
    try {
        const result=filePaths()
        res.json(result)
    } catch (error) {
        res.json({error:"Failed to parse file path"})
    }
})
app.listen(4000,()=>{
    console.log("The started the port 4000")
})