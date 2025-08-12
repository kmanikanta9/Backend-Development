

const mongoose = require('mongoose')
const socialSchema = new mongoose.Schema({
    url:{type:String}
})
const profileSchema = new mongoose.Schema({
    bio:{type:String},
    socialMedialinks:[socialSchema],
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

const ProfileModel = mongoose.model("Profile",profileSchema)
module.exports = ProfileModel