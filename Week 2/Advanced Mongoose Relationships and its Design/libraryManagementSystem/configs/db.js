let mongoose = require("mongoose");
let connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/libraryDataBase");
    console.log("Connected to Db..");
  } catch (error) {
    console.log("Error while connecting DB to NODE :", error.message);
  }
};

module.exports = connectToDb;
