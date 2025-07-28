

const express=require('express')

const app=express()

app.get('/home',(req,res)=>{
    res.send('Welcome to Home Page.')
})

app.get('/aboutus',(req,res)=>{
    res.status(201).json({message:'Welcome to About Us'})
})
app.get('/contactus',(req,res)=>{
    res.status(201).json({message:'This is contact page.'})
})
app.use((req,res)=>{
    res.status(400).json('404 Not Found')
})
app.listen(3000,()=>{
    console.log('Sever started at the port 3000')
})