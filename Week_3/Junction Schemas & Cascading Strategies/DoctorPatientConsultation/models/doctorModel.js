let mongoose = require("mongoose");

let doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  isActive: { type: Boolean, default: true },
});
let doctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = doctorModel;
