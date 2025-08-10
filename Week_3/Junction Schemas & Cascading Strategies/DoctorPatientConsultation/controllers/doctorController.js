const consultationModel = require("../models/consultationModel");
const doctorModel = require("../models/doctorModel");

let addDoctor = async (req, res) => {
  try {
    let doctor = await doctorModel.create(req.body);
    res.status(201).json({ message: "Doctor is Added", doctor });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let deleteDoctor = async (req, res) => {
  try {
    let { doctorId } = req.params;
    let doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(200).json({ message: "Doctor is not found.." });
    }
    doctor.isActive = false;
    await doctor.save();
    await consultationModel.updateMany(
      { doctorId },
      { $set: { isActive: false } }
    );
    res.status(200).json({ message: "Doctor is Deleted.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let getAllPatientsConsultedByDoctor = async (req, res) => {
  try {
    let { doctorId } = req.params;
    let patients = await consultationModel
      .find({ doctorId })
      .sort({ consultedAt: -1 })
      .populate("patientId");
    if (patients.length == 0) {
      return res.status(200).json({ message: "No Patients are found.." });
    }
    res
      .status(200)
      .json({ message: "All Patients Consulted By Doctor", patients });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let totalConsultationsDoneByDoctor  = async(req,res)=>{
    try {
        let {doctorId} = req.params 
        let consultations = await consultationModel.find({ doctorId, isActive: true });
        res.status(200).json({message:`Total Number of consultations done by doctor: ${consultations.length}`}) 
    } catch (error) {
        console.log(error.message);
    res.status(500).json({ message: error.message });
    }
}
module.exports = { addDoctor, deleteDoctor, getAllPatientsConsultedByDoctor , totalConsultationsDoneByDoctor };
