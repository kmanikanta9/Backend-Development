let mongoose = require("mongoose");
let mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  expertise: [String],
  isActive: { type: Boolean, default: true },
  isArchive: { type: Boolean, default: false },
});
let mentorModel = mongoose.model("mentor", mentorSchema);
module.exports = mentorModel 