let express = require("express")
const {addDoctor, deleteDoctor, getAllPatientsConsultedByDoctor, totalConsultationsDoneByDoctor} = require("../controllers/doctorController")
let doctorRouter = express.Router()

// add doctor 
doctorRouter.post("/add-doctor",addDoctor)
// delete doctor 
doctorRouter.delete("/dlt-doctor/:doctorId" ,deleteDoctor)
//  list of patients consulted by this doctor 
doctorRouter.get("/doctors/:doctorId/patients",getAllPatientsConsultedByDoctor)
// total number of consultations this doctor has done 
doctorRouter.get("/doctors/:doctorId/consultations/count",totalConsultationsDoneByDoctor)









module.exports = doctorRouter