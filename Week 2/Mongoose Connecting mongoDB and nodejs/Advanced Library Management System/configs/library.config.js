

const mongoose = require('mongoose')

const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Library')
        console.log("Connected to DB")
    } catch (error) {
        console.log("Server failed to connect DB")
        console.log(error)
    }
}

module.exports = connectToDB