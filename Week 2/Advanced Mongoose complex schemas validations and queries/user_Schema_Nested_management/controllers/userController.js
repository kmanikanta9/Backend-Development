const userModel = require("../models/userModel");

let addNewUser = async (req, res) => {
  try {
    await userModel.create(req.body);
    res.status(200).json({ message: "User Created..." });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ Error: "Error at adding new user " });
  }
};
let addNewProfile = async (req, res) => {
  try {
    let id = req.params.userId;
    let newProfile = req.body;
    let user = await userModel.findById({ _id: id });
    user.profile.push(newProfile);
    await user.save();
    res.status(200).json({ message: "Profile Added.." });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ Error: "Error at adding new profile " });
  }
};
let getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModel.find();
    if (Object.keys(req.query).length == 0) {
      return res.status(200).json({ message: "Users:", Users: allUsers });
    }
    let { profileName } = req.query;
    let usersWithQueryProfile = allUsers.filter((user) =>
      user.profile.some((profile) => profile.profileName === profileName)
    );
    if(usersWithQueryProfile.length==0){
      return res.status(200).json({ message: "No users were found with the specified profile name."})
    }
    console.log(usersWithQueryProfile);
    res
      .status(200)
      .json({
        message: "Users With profile Name",
        Users: usersWithQueryProfile,
      });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ Error: "Error at getting all the users and their profiles.. " });
  }
};
let getUserByuserNameAndProfileName = async (req, res) => {
  try {
    let { name, profileName } = req.query;
    let user = await userModel.find({ name: name });
    console.log(user);
    if (user.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    user = user[0];
    if (user.profile.length == 0) {
      return res
        .status(404)
        .json({ message: "No Profiles Exist for this User.." });
    }

    let users = user.profile.filter((profile) => {
      if (profileName == profile.profileName) return profile;
    });

    if (users.length == 0) {
      return res.status(404).json({
        message: "User found, but profile not found",
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
    }

    res.status(200).json({
      message: "User",
      User: {
        name: user.name,
        email: user.email,
        password: user.password,
        profile: users[0],
      },
    });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ Error: "Error at getting user with prifileName.. " });
  }
};
let updateProfileByProfileName = async (req, res) => {
  try {
    let id = req.params.userId;
    let name = req.params.profileName;
    let newUrl = req.body.url;
    let user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No User with that id to update profile" });
    }
    if (user.profile.length == 0) {
      return res
        .status(404)
        .json({ message: "No Profile with that profileName to update.." });
    }
    user.profile.map((profile) => {
      return profile.profileName == name ? (profile.url = newUrl) : profile.url;
    });
    await user.save();
    res.status(200).json({ message: "Updated ProfileUrl Using ProfileName." });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ Error: "Error at updating profile using id and profileName.. " });
  }
};

let deleteProfileByProfileName = async (req, res) => {
  try {
    let id = req.params.userId;
    let name = req.params.profileName;
    let user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No User with that id to delete profile" });
    }
    if (user.profile.length == 0) {
      return res
        .status(404)
        .json({ message: "No Profile with that profileName to delete.." });
    }
    user.profile = user.profile.filter(
      (profile) => profile.profileName != name
    );
    await user.save();
    res.status(200).json({ message: "Deleted Profile Using ProfileName." });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ Error: "Error at Deleting profile using id and profileName.. " });
  }
};

module.exports = {
  addNewProfile,
  addNewUser,
  getAllUsers,
  updateProfileByProfileName,
  deleteProfileByProfileName,
  getUserByuserNameAndProfileName,
};
