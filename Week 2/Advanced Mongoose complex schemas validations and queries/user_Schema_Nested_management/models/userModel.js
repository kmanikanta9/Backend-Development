let mongoose = require("mongoose");

let profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    enum: ["fb", "twitter", "github", "instagram"],
    required: true,
  },
  url: { type: String, required: true, unique: true },
});

let userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: [profileSchema],
});

let userModel = mongoose.model("Users",userSchema);

module.exports = userModel;

