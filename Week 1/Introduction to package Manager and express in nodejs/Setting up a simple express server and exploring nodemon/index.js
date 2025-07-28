const express=require('express')

const app=express()
const fs=require('fs')

app.get("/home",(req,res)=>{
    res.send("This is home route")
})
app.get("/contactus",(req,res)=>{
    res.send("Contact us at contact@contact.com")
})
app.listen(3000,()=>{
    console.log("Server started on the port 3000")
})
