let mongoose = require("mongoose");

let patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
}
);
let patientModel = mongoose.model("Patient", patientSchema);
module.exports = patientModel;
