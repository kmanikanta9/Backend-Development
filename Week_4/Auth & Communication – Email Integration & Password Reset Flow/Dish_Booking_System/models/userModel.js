let mongoose = require("mongoose")
let userSchema = new mongoose.Schema({
    name:String , 
    email : {type:String , required:true,unique:true},
    password:{type:String,unique:true},
    role:{type:String,enum:["user","admin","chef"],default:"user"}
})
let UserModel = mongoose.model("User",userSchema)
module.exports = UserModel ;