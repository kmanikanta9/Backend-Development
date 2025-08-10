let express = require("express")
const { addConsultation } = require("../controllers/consultationController")
let consultationRouter = express.Router()

// add consultation 
consultationRouter.post("/add-consultation",addConsultation)
module.exports = consultationRouter