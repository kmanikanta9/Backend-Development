let express = require("express")
const { addPatient, deletePatient, getAllDoctorsthispatientConsulted, getActivePatientsBasedOnGender } = require("../controllers/patientController")
let patientRouter = express.Router()

// add patient 
patientRouter.post("/add-patient",addPatient)
// delete Patient by id 
patientRouter.delete("/dlt-patient/:patientId",deletePatient)
// list of doctors this patient has consulted 
patientRouter.get("/:patientId/doctors" , getAllDoctorsthispatientConsulted)
// get Active Patients Based On Gender
patientRouter.get("/patients",getActivePatientsBasedOnGender)




module.exports = patientRouter