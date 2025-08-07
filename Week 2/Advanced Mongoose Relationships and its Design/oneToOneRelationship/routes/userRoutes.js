let express = require("express")
const { addNewUser, getAllUsers } = require("../controllers/userController")
let userRouter = express.Router()


// add user 
userRouter.post('/add-user',addNewUser)
// get all users 
userRouter.get("/all-users",getAllUsers)


module.exports = userRouter
