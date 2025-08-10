let express = require("express");
const { addMentor } = require("../controllers/mentorController");
let mentorRouter = express.Router()


// add mentor 
mentorRouter.post("/add",addMentor)


module.exports = mentorRouter ; 