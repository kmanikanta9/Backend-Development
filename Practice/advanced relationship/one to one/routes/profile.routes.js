const express = require('express');
const ProfileModel = require('../models/profile.model');

const profileRouter = express.Router()



profileRouter.post('/add-profile',async(req,res)=>{
    try {
        let profileDetails = await ProfileModel.create(req.body)
        res.status(201).json({msg:"Add User",profile:profileDetails})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Something went wrong"})
    }
})

profileRouter.post('/add-links/:profileId',async(req,res)=>{
    const {profileId} = req.params
    try {
        let profile = await ProfileModel.findById(profileId)
        if(!profile){
            res.status(404).json({msg:"Not found"})
        }
        else{
            profile.socialMedialinks.push(req.body)
            profile.save()
            res.status(200).json({msg:"link added"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = profileRouter;