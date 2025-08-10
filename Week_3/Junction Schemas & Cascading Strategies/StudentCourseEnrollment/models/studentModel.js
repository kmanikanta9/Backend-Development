let mongoose = require("mongoose");

let studentScheme = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true },
});

let studentModel = mongoose.model("Student", studentScheme);
module.exports = studentModel;
