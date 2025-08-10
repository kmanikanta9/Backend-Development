let mongoose = require("mongoose");

let sessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mentor",
    required: true,
  },
  learners: [
    { type: mongoose.Schema.Types.ObjectId, ref: "learner", required: true },
  ],
  topic: { type: String, required: true },
  sessionTime: { type: Date, required: true },
  duration: { type: Number },
  notes: { type: String },
  isArchived:{type:Boolean , default:false},
  attendance: [
    {
      learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "learner" },
      present: { type: Boolean, default: false },
    },
  ],
  feedback:[
    {
      learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "learner" },
      rating: { type: Number, min: 1, max: 5 },
      comments: String,
    },
  ],
});

let sessionModel = mongoose.model("session", sessionSchema);
module.exports = sessionModel;
