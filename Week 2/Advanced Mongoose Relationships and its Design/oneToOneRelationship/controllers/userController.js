const userModel = require("../models/userModel");

let addNewUser = async (req, res) => {
  try {
    let user = await userModel.create(req.body);
    console.log(user);
    res.status(201).json({ message: "User Created.." });
  } catch (error) {
    console.log("Error while adding new User :", error.message);
    res
      .status(500)
      .json({ Error: "Something went wrong , please try again later..." });
  }
};

let getAllUsers = async (req, res) => {
  try {
    let Users = await userModel.find();
    res.status(200).json({ message: "Users", users: Users });
  } catch (error) {
    console.log("Error while getting all Users :", error.message);
    res
      .status(500)
      .json({ Error: "Something went wrong , please try again later..." });
  }
};
module.exports = { addNewUser , getAllUsers };
