



const express = require('express')
const limiter = require('../middlewares/rateLimiter')

const appRouter = express.Router()

appRouter.get('/public',(req,res)=>{
    res.status(201).json({msg:"This is a Public endPoint!"})
})

appRouter.get('/limited',limiter,(req,res)=>{
    res.status(201).json({msg:"You have access to this limited endPoint!"})
})

module.exports = appRouter