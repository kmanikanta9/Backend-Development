let mongoose = require("mongoose");
let connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/studentCourseDB");
    console.log("Connected to Db");
  } catch (error) {
    console.log("Error While connecting Db to NODE");
    console.log(error.message);
  }
};

module.exports = connectToDb;
