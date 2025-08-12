

const express = require('express');
const UserModel = require('../models/user.model');

const userRouter = express.Router()



userRouter.post('/add-user',async(req,res)=>{
    try {
        let user = await UserModel.create(req.body)
        res.status(200).json({msg:"User added",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
})

userRouter.post('/add-profile/:userId',async(req,res)=>{
    const {userId} = req.params
    let user = await UserModel.findById(userId)
    try {
        if(!user){
            res.status(404).json({msg:"User not found" })
        }
        else{
            user.profiles.push(req.body)
            user.save()
            res.status(200).json({msg:"Profile added",user})
        }
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
})

// userRouter.get('/',async(req,res)=>{
//     try {
//         let user = await UserModel.find({})
//         res.status(200).json({msg:"All Users",user})
//     } catch (error) {
//         res.status(500).json({msg:"Something went wrong"})
//     }
// })
userRouter.get('/get-users',async(req,res)=>{
    let allUsers = await UserModel.find()
    let {profileName} = req.query;
    let userProfils = allUsers.filter((user)=>user.profiles.some((profile)=>profile.profileName==profileName))
    console.log(userProfils)

})

userRouter.get('/search',async(req,res)=>{
    const {name,profile} = req.query

    // let user = await UserModel.find({name:name})

    if(!name){
        return res.status(400).json({msg:"Query parameter name is required"})
    }
    const user = await UserModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }
    });
    if(!user){
        return res.json({msg:"User not found"})
    }
    if(!profile){
        return res.status(200).json({user})
    }
    const matchingProfile = user.profiles.find((p)=>p.name===profile)
    if(matchingProfile){
        return res.status(200).json({profile:matchingProfile})
    }
    else{
        return res.status(404).json({msg:"User found, but profile not found",user})
    }
})
// userRouter.delete('/delete-profile',(req,res)=>{

// })

 userRouter.patch('/update-profile/:userId/:profileName',async (req, res) => {
  try {
    let id = req.params.userId;
    let name = req.params.profileName;
    let newUrl = req.body.url;
    let user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No User with that id to update profile" });
    }
    if (user.profiles.length == 0) {
      return res
        .status(404)
        .json({ message: "No Profile with that profileName to update.." });
    }
    user.profiles.map((profile) => {
      return profile.profileName == name ? (profile.url = newUrl) : profile.url;
    });
    await user.save();
    res.status(200).json({ message: "Updated ProfileUrl Using ProfileName." });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ Error: "Error at updating profile using id and profileName.. " });
  }
});

userRouter.delete('/delete-profile/:userId/:profileName',async(req,res)=>{
    const {userId} = req.params.userId
    const {profileName} = req.params.profileName;

    let user = await UserModel.findById(userId)

    await UserModel.findByIdAndDelete(userId)
})
module.exports = userRouter;