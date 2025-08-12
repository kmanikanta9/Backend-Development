


const express = require('express');
const UserModel = require('../models/oneuser.model');

const userRouter = express.Router()



userRouter.post('/add-user',async(req,res)=>{
    try {
        let user = await UserModel.create(req.body)
        res.status(201).json({msg:"Add User",user})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Something went wrong"})
    }
})

module.exports = userRouter;

