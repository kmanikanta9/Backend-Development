const profileModel = require("../models/profileModel");
const userModel = require("../models/userModel");

let addProfile = async (req, res) => {
  try {
    let profile = await profileModel.create(req.body);
    res.status(201).json({ message: "Profile Created", profile });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
};

let getAllProfilesByuserId = async(req,res)=>{
    try {
        let userId = req.params.userId
        let user = await userModel.findById(userId,{name:1 , email:1 , _id:0})
        let profile = await profileModel.find({user:userId})
        res.status(200).json({message:"profile by id" , user :user , profile:profile})
    } catch (error) {
        console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
    }
}
module.exports = {addProfile , getAllProfilesByuserId} ;