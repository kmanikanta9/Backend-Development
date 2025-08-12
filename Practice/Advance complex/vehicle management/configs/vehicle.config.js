

const mongoose = require('mongoose')


const connectToDB = async()=>{

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vehicle')
        console.log("Conected to db")
    } catch (error) {
        console.log("Failed to connect db")
        console.log(error)
    }
}

module.exports = connectToDB;