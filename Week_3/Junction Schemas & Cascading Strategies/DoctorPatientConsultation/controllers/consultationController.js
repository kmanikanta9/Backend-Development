
let consultationModel= require("../models/consultationModel")
const doctorModel = require("../models/doctorModel")
const patientModel = require("../models/patientModel")
let addConsultation = async(req,res)=>{
    try {
        let {doctorId , patientId} = req.body 
        if(!doctorId || !patientId){
            return res.status(403).json({message:"DoctorId and PatientId are required for concultation"})
        }
        let doctor =  await doctorModel.findOne({ _id: doctorId, isActive: true });
        let patient = await patientModel.findOne({ _id:patientId, isActive: true })
        if(!doctor || !patient){
            return res.status(200).json({message:"No Doctor or Patient Found..."})
        }
        let alreadyConsult = await consultationModel.findOne({patientId , doctorId})
        if(alreadyConsult){
            return res.status(200).json({message:"Patient already consulted the doctor"})
        }
        let consultationDetails  = await consultationModel.create(req.body)
        res.status(200).json({message:"Consultation is added",consultationDetails})
    } catch (error) {
        console.log(error.message);
    res.status(500).json({ message: error.message });
    }
}

module.exports = {addConsultation}