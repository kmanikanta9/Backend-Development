let mongoose = require("mongoose") 
require("dotenv").config()
let connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectToDb