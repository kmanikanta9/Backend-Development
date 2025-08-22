const mongoose =  require("mongoose");
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const saltRounds = 10;
const register = async(req,res)=>{
	try{

		const {name,email,role,password} = req.body;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
	if(err){
		return res.status(404).json({Error:"Error in hasing the apssword",Err:err.message});

	}
	else{
		let user =  await userModel.create({name,email,password:hash,role});
		return res.status(201).json({Message:"User Registered Successfully",name:user.name});
	}  
})

	}
	catch(err){
		return res.status(404).json({Error:"Error in registering the user",Err:err.message});
	}
}

const login = async(req,res)=>{
	try{
      const {email,password,role} = req.body;
	  let user = await userModel.findOne({email})
	  if(!user){
		return res.status(404).json({Error:"USer is not registered,please register"})
	  }
	  let hash = user.password;
	  bcrypt.compare(password, hash, async function(err, result) {

		if(result==true){

			let accessToken = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:300});
            let refreshToken = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:1800});

			return res.status(202).json({Message:"USer Logged in Succesfully",accessToken,refreshToken})
		}else{
			return res.status(409).json({Error:"Wrong Password!!!!"});

		}
});



	}catch(err){
		res.status(404).json({Error:"Error in logging the user",errr:err.message});
	}
}



const getUsers = async(req,res)=>{
	try{
  
		let users = await userModel.find();
		if(users.length==0){
			return res.status(404).json({Error:"No users yet"});
		}else{
			return res.status(200).json({Message:"Here is the users List",users});
		}
	}
	catch(err){
		res.status(404).json({Error:"Error in getting all users",Err:err.message});
	}
}


const getProfile = async(req,res)=>{
	let  id = req.userId;
	try{
               const user = await userModel.findById(req.userId).select("-password");
				if(!user){
					return res.status(404).json({Error:"User is not Valid!!!"});
				}
				else{
					return res.status(200).json({Message:"User Details",user});
				}
	}
	catch(err){
		res.status(404).json({Error:"Error in getting Profile of a user",Err:err.message});
	}



}
const updateProfile = async(req,res)=>{
	let  id = req.user?.userId;
	try{
		        let  id = req.user?.userId;
				console.log(id)
				const {role} = req.body;
				if(role){
					return res.status(404).json({Error:"Can't update the Role..!!!"});
				}

    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
				if(!user){
					return res.status(404).json({Error:"User is not Valid!!!"});
				}
				else{
					return res.status(200).json({Message:"User Updated",user});
				}
			}
			
	catch(err){
		res.status(404).json({Error:"Error in updating Profile of a user",Err:err.message});
	}
}

module.exports = {
	register,login,getUsers,getProfile,updateProfile
}