let mongoose = require("mongoose");

let courseScheme = new mongoose.Schema({
  title: String,
  description: String,
  isActive: { type: Boolean, default: true },
});

let courseModel = mongoose.model("Course", courseScheme);
module.exports = courseModel;
