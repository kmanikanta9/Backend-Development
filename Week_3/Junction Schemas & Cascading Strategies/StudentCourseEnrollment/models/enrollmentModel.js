let mongoose = require("mongoose");

let enrollmentScheme = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

let enrollmentModel = mongoose.model("Enroll", enrollmentScheme);
module.exports = enrollmentModel;
