

const mongoose = require('mongoose')

const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taskapp')
        console.log("connected to DB")
    } catch (error) {
        console.log("Not connected to DB")
        console.log(error)
    }
}

module.exports=connectToDB