let express = require("express");
const { addSession } = require("../controllers/sessionController");
let sessionRouter = express.Router()
// add session 
sessionRouter.post("/add",addSession)
module.exports = sessionRouter ; 