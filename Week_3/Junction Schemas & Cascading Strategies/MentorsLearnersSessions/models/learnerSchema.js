let mongoose = require("mongoose");
let learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  interests: [String], 
  isActive: { type: Boolean, default: true },
  isArchive : {type:Boolean , default:false}
});
let learnerModel = mongoose.model("learner", learnerSchema);
module.exports = learnerModel ;