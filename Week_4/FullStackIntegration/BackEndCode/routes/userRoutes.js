const express = require("express");
const { register, getUsers, login, getProfile, updateProfile } = require("../controllers/userControllers");
const { userValidator, roleValidator } = require("../middlewares/userValidator");
const { authMid } = require("../middlewares/authMiddle");
const userRouter = express.Router();
userRouter.post("/register",userValidator,roleValidator,register);
userRouter.post("/login",login)
userRouter.post("/getUsers",authMid(["admin"]),getUsers);
userRouter.post("/getProfile",authMid(["admin","moderator","user"]),getProfile);
userRouter.patch("/updateProfile",authMid(["admin","user","moderator"]),updateProfile)
module.exports = userRouter;