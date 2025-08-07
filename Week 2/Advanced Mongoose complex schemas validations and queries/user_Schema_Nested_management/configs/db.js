let mongoose = require("mongoose");
let connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userProfileDB");
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error While Connecting to Db:", error.message);
  }
};

module.exports = connectToDB;
