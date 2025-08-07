let express = require("express");
const {addProfile, getAllProfilesByuserId} = require("../controllers/profileController");
let profileRouter = express.Router();



// add profile 
profileRouter.post('/add-profile' , addProfile)
 // get profiles by userID
profileRouter.get("/profiles/:userId",getAllProfilesByuserId)







module.exports = profileRouter;
