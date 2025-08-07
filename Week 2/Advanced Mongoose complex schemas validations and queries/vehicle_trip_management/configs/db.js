let mongoose = require("mongoose");
let connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tripDataBase");
    console.log("✅ Connected To DB");
  } catch (error) {
    console.log("❌ Error :", error.message);
  }
};
module.exports = connectToDB;
