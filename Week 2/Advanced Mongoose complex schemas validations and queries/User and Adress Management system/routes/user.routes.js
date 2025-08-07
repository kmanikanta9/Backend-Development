
const express = require('express');
const UserModel = require('../models/user.model');

const userRouter = express.Router()


userRouter.get('/allusers',async(req,res)=>{
    try {
        let users = await UserModel.find({});
        res.status(200).json({msg:"All Users",users})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong."})
    }
})

userRouter.post('/add-user',async(req,res)=>{
    try {
        let user = await UserModel.create(req.body)
        res.status(200).json({msg:"User Added",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
})

userRouter.post('/add-address/:userId',async(req,res)=>{
    const {userId} = req.params
    try {
        let user = await UserModel.findById(userId)
        if(!user){
            res.status(404).json({msg:"User not found"})
        }
        else{
            user.address.push(req.body)
            user.save()
            res.status(200).json({msg:"User Added",user})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
})
userRouter.patch('/update-address/:userId',async(req,res)=>{
    const {userId} = req.params;
    try {
        let user = await UserModel.findById(userId)
        if(!user){
            res.status(404).json({msg:"User Not Found"})
        }
        else{
            await UserModel.findByIdAndUpdate(userId,req.body)
            // await user.save()
            res.status(201).json({msg:"Address added to the user",user:user.name})
        }
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
})

userRouter.get('/userby/:userId',async(req,res)=>{
    try {
        const {userId} =  req.params
        let user = await UserModel.findById(userId)
        if(!user){
            res.status(404).json({msg:"User Not Found"})
        }
        else{
            await UserModel.find({})
            res.status(200).json({msg:"User",user})
        }
        
    } catch (error) {
        res.status(500).json({msg:"Something went wrong."})
    }
})

userRouter.get('/userbyId/:userId',async(req,res)=>{
    const {userId} = req.params;
    let user = await UserModel.findById(userId)
    if(!user){
        res.status(404).json({msg:"User not found"})
    }
    else{
        console.log(user)
        res.status(200).json({msg:"user",userDetails:user})
    }
})

userRouter.get('/summary',async(req,res)=>{
    try {
        let user = await UserModel.find()
        console.log(user.length)
        let totalAddress = user.reduce((acc,cur)=>{
            return acc+ (cur.address ? cur.address.length:0)
        },0)
        let userAddressSummary = user.map((user) => ({
        name: user.name,
        id : user._id,
        addressCount: user.address? user.address.length : 0
        }));
        console.log(totalAddress)
        res.json({msg:"Users in the list",usersLength:user.length,addressCount:totalAddress,summary:userAddressSummary})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong."})
    }
})
module.exports = userRouter;