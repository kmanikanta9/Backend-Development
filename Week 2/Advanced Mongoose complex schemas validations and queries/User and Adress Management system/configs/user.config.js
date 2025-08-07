

const mongoose = require('mongoose')

const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userdata')
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        console.log("Faild to connect DB.")
    }
}

module.exports = connectToDB