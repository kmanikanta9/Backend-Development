let express = require("express");
const { addLearner } = require("../controllers/learnerController");
let learnerRouter = express.Router()


// add learner 
learnerRouter.post("/add",addLearner)
module.exports = learnerRouter ; 