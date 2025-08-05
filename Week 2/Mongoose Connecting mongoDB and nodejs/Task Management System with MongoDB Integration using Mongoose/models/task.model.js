
const mongoose = require("mongoose")

let taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:String
})

let TaskModel =  mongoose.model('Tasks',taskSchema)

module.exports = TaskModel