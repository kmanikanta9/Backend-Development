const express=require('express')

const app=express()
const fs=require('fs')
app.use(express.json())
app.get('/get',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let users=data.users
    console.log(users)
    res.json({message:"users",users})
})
app.get('/list',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('./db1.json','utf-8'))
    let users=data.users
    res.json({message:"All users",users})
})
app.use((req,res)=>{
    res.status(400).json('404 Not Found')
})
app.listen(4000,()=>{
    console.log("server started at port 4000")
})