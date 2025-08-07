let express = require("express");
const {
  addNewUser,
  addNewProfile,
  getAllUsers,
  updateProfileByProfileName,
  deleteProfileByProfileName,
  getUserByuserNameAndProfileName,
} = require("../controllers/userController");

const dataCheckMW = require("../middlewares/dateCheckMw");
let userRouter = express.Router();

userRouter.post("/add-user", addNewUser);
userRouter.post("/add-profile/:userId", addNewProfile);
userRouter.get("/get-users", getAllUsers);
userRouter.get("/search" , getUserByuserNameAndProfileName)
userRouter.put(
  "/update-profile/:userId/:profileName",
  dataCheckMW,
  updateProfileByProfileName
);
userRouter.delete(
  "/delete-profile/:userId/:profileName",
  dataCheckMW,
  deleteProfileByProfileName
);

module.exports = userRouter;
