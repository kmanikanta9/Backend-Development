

const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    profileName:{type:String,enum:["fb", "twitter", "github", "instagram"],required:true},
    url:{type:String,required:true}
})

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:6},
    profiles:[profileSchema]
})


const UserModel = mongoose.model("User",userSchema)


module.exports = UserModel