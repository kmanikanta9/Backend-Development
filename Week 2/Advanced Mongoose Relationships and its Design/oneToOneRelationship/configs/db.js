let mongoose = require("mongoose");

let connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/oneToOneDb");
    console.log("Connected to Db");
  } catch (error) {
    console.log("Error to Connect mongoDb to nodeJs :", error.message);
  }
};
module.exports = connectToDb;
