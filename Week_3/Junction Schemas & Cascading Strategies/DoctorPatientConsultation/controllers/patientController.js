const consultationModel = require("../models/consultationModel");
const doctorModel = require("../models/doctorModel");
let patientModel = require("../models/patientModel");
let addPatient = async (req, res) => {
  try {
    let patient = await patientModel.create(req.body);
    res.status(201).json({ message: "Patient is Added", patient });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let deletePatient = async (req, res) => {
  try {
    let { patientId } = req.params;
    let patient = await patientModel.findById(patientId);
    if (!patient) {
      return res.status(200).json({ message: "patient is not found.." });
    }
    patient.isActive = false;
    await patient.save();
    await consultationModel.updateMany(
      { patientId },
      { $set: { isActive: false } }
    );
    res.status(200).json({ message: "patient is Deleted.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let getAllDoctorsthispatientConsulted = async (req, res) => {
  try {
    let { patientId } = req.params;
    let Doctors = await consultationModel
      .find({ patientId })
      .sort({ consultedAt: -1 })
      .populate("doctorId");
    if (Doctors.length == 0) {
      return res.status(200).json({ message: "No doctors are found.." });
    }
    res
      .status(200)
      .json({ message: "All Doctors This patient has Consulted", Doctors });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let getActivePatientsBasedOnGender = async (req, res) => {
  try {
    let { gender } = req.query;
    gender = gender=="Male" || gender == "male" ? "Male" : gender=="Female" || gender == "female" ? "Female" : "Male" ;
    let patients = await patientModel.find({gender,isActive:true},{name:1,age:1,_id:0})
    if(patients.length==0){
        return res.status(200).json({message:"No active patients are found with that gender"})
    }
    res.status(200).json({ message: `All active ${gender} patients` , patients });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addPatient,
  deletePatient,
  getAllDoctorsthispatientConsulted,
  getActivePatientsBasedOnGender
};
