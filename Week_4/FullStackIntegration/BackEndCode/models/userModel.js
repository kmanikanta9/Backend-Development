const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name:{type:String,minlength:3},
	email:{type:String,unique:true,required:true},
	password:{type:String,required:true},
	role:{type:String,enum:["admin","moderator","user"],default:"user"},
	createdAt:{type:Date,default:Date.now()}
})

const userModel = mongoose.model("/users",userSchema);
module.exports = userModel;
