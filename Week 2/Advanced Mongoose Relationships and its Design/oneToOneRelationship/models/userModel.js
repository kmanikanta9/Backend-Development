let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, unique: true },
});

let userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
