const mentorModel = require("../models/mentorSchema");

let addMentor = async (req, res) => {
  try {
    // console.log(req.body);
    let mentor = await mentorModel.create(req.body)
    res.status(201).json({ message: "Mentor Added..",mentor });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMentor };
