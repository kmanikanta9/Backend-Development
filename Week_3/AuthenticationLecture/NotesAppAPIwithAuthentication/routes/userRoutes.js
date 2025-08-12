let express = require ('express');
const signUp = require('../controllers/userController');
let userRouter = express.Router ();

userRouter.post("/signup", signUp);

module.exports = userRouter;
