let express = require("express");
let userRouter = express.Router();
const bcrypt = require("bcrypt");
let userModel = require("../models/userModel");
const saltRounds = 10;
var jwt = require('jsonwebtoken');

// signup route
userRouter.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    let { password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      try {
        let user = await userModel.create({ ...req.body, password: hash });
        res
          .status(201)
          .json({ message: "User SignUp Successfully completed", user });
      } catch (error) {
        res.status(500).json({ message: "Something Went Wrong", Error: err });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// login route
userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    // console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found,Please signup.." });
    }
    let hash = user.password
    bcrypt.compare(password, hash, function (err, result) {
      try {
        if(!result){
            return res.status(403).json({messsage:"Please provide valid password"})
        }
        var token = jwt.sign({ userId: user._id }, 'shhhhh');
        res.status(200).json({ message: "user logged in..." ,token});
      } catch (error) {
        res.status(400).json({message:error.message,Error:err})
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = userRouter;
