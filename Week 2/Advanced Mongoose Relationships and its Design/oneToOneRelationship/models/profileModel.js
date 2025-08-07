let mongoose = require("mongoose");
let profileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  socialMediaLinks: { type: Array },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

let profileModel = mongoose.model("Profiles", profileSchema);

module.exports = profileModel;
