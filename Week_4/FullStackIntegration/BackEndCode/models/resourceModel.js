const mongoose = require("mongoose");

const reourceSchema = new mongoose.Schema({
	title:{type:String,required:true,minlength:3},
	description:{type:String,maxlength:500},
	createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
	createdAt:{type:Date,default:Date.now()}

})

const resourceModel =  mongoose.model("resources",reourceSchema);
module.exports = resourceModel;
