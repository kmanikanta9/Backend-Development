

const mongoose = require('mongoose')

let taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{type:String,required:true},
        priority:{
            type:String,
            enum:['low','medium','high'],
            required:true
        },
        isCompleted:{
            type:Boolean,
            default:false
        },
        completionDate:{type:Date},
        dueDate:{type:Date}
    }
)

let TaskModel = mongoose.model('TasksManage',taskSchema)


module.exports = TaskModel;