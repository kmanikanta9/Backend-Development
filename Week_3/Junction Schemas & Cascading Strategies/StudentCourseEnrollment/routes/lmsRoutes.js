let express = require("express")
const { addStudent, addCourse, enrollCourse, deleteStudents, deleteCourse, getAllActiveCoursesByStudentId, getAllActiveStudentsByCourseId } = require("../controllers/tasksController");

let lmsRouter = express.Router()

// add student 
lmsRouter.post("/addstudent",addStudent)
//add course 
lmsRouter.post("/addcourse",addCourse)
// enroll course 
lmsRouter.post("/enroll",enrollCourse) 
// delete student by id
lmsRouter.delete("/students/:studentId",deleteStudents)
// delete course by id 
lmsRouter.delete("/courses/:courseId",deleteCourse)
// get all active courses which are enrolled by student 
lmsRouter.get("/students/:studentId/courses",getAllActiveCoursesByStudentId)
// get all active students which enrolled a perticular course
lmsRouter.get("/courses/:courseId/students",getAllActiveStudentsByCourseId)
module.exports = lmsRouter ;