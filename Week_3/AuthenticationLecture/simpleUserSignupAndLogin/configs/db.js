let mongoose = require("mongoose");
let connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userSIGNUP_LOGINdb");
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToDB;
