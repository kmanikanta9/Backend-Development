const courseModel = require("../models/courseModel");
const enrollmentModel = require("../models/enrollmentModel");
const studentModel = require("../models/studentModel");

let addStudent = async (req, res) => {
  try {
    let student = await studentModel.create(req.body);
    res.status(201).json({ message: "Student Created.", student });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let addCourse = async (req, res) => {
  try {
    let course = await courseModel.create(req.body);
    res.status(201).json({ message: "Course Created.", course });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let enrollCourse = async (req, res) => {
  try {
    let { studentId, courseId } = req.body;
    if (!studentId || !courseId) {
      return res
        .status(403)
        .json({ message: "studentId and CourseId are required." });
    }
    let student = await studentModel.findById(studentId);
    let course = await courseModel.findById(courseId);
    if (!student || !course) {
      return res.status(405).json({
        message:
          "No student or Course find to enroll . Please provide valid data",
      });
    }
    if (!student.isActive || !course.isActive) {
      return res.status(405).json({ message: "Not able to enrolled.." });
    }
    let alreadyEnrolled = await enrollmentModel.findOne({
      studentId,
      courseId,
    });
    if (alreadyEnrolled) {
      return res
        .status(409)
        .json({ message: "Student already enrolled in this course" });
    }
    let enrolledStudent = await enrollmentModel.create(req.body);
    res
      .status(201)
      .json({ message: "Enrolled Successfully..", enrolledStudent });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let deleteStudents = async (req, res) => {
  try {
    let { studentId } = req.params;
    let student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(200).json({ message: "Student is not found..." });
    }
    if (!course.isActive) {
      return res.status(200).json({ message: "student is already deleted..." });
    }
    student.isActive = false; // soft deleting
    await student.save();
    await enrollmentModel.updateMany(
      { studentId },
      { $set: { isActive: false } }
    );

    res.status(200).json({ message: "Student and relative data is deleted.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let deleteCourse = async (req, res) => {
  try {
    let { courseId } = req.params;
    let course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(200).json({ message: "course is not found..." });
    }
    if (!course.isActive) {
      return res.status(200).json({ message: "course is already deleted..." });
    }
    course.isActive = false; // soft deleting
    await course.save();
    await enrollmentModel.updateMany(
      { courseId },
      { $set: { isActive: false } }
    );
    res.status(200).json({ message: "course and relative data is deleted.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let getAllActiveCoursesByStudentId = async (req, res) => {
  try {
    let { studentId } = req.params;
    let courses = await enrollmentModel
      .find({ studentId, isActive: true })
      .populate("courseId");
    if (courses.length == 0) {
      return res.status(200).json({ message: "No courses Found.." });
    }
    res.status(200).json({ message: "All Active Courses which are enrolled by aperticular Student", courses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let getAllActiveStudentsByCourseId = async (req, res) => {
  try {
    let { courseId } = req.params;
    let students = await enrollmentModel
      .find({ courseId, isActive: true })
      .populate("studentId");
    if (students.length == 0) {
      return res.status(200).json({ message: "No students Found.." });
    }
    res
      .status(200)
      .json({ message: "All Active students who enrolled a perticluar course", students });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addStudent,
  addCourse,
  enrollCourse,
  deleteStudents,
  deleteCourse,
  getAllActiveCoursesByStudentId, 
  getAllActiveStudentsByCourseId
};
