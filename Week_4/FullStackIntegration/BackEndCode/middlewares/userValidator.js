const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const userValidator = async (req,res,next)=>{
     const {email,role} = req.body
	let user =  await userModel.findOne({email});
	if(user){
    return res.status(409).json({ message: "Duplicate Email / User" });
}

	next();

}


const roleValidator = async(req,res,next)=>{
	const {role} = req.body;
	let allowed = ["user","moderator","admin"];
	if(allowed.includes(role)){
		next();
	}
	else{
		return res.status(404).json({Error:"Unauthorised Actions of user role"});
	}
}
module.exports={
	userValidator,roleValidator
}