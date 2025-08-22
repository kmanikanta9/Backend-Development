const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToData = async () => {
  console.log("Connecting to MongoDB...");
  try {
   

    console.log("Mongo URI:", process.env.Mongo_Cloud);

    await mongoose.connect(process.env.Mongo_Cloud);

    console.log("✅ Connected to FullStack MongoDB database");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

module.exports = connectToData;
