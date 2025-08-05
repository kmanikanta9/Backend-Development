const TaskModel = require("../models/task.model")


const getallTasks = async(req,res)=>{
    try {
        let task = await TaskModel.find({})
        res.status(201).json({msg:"All Tasks",task})
    } catch (error) {
        res.status.json(500).json({msg:"Something went wrong"})
    }
}

const addTasks =async(req,res)=>{
    try {
        let task = TaskModel.create(req.body)
        res.json({msg:"Task Added",task})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong."})
    }
}

const updateTask = async(req,res)=>{
    const {taskId} = req.params;

    try {
        let task = await TaskModel.findById(taskId)
        if(!task){
            res.status(404).json({msg:"Task not found"})
        }
        else{
            await TaskModel.findByIdAndUpdate(taskId,req.body)
            res.status(201).json({msg:"Task Updated"})
        }
    } catch (error) {
         res.status(500).json({msg:"Something went wrong."})
    }
}

const deleteTask = async(req,res)=>{
    const {taskId} = req.params;

    try {
        let task = await TaskModel.findById(taskId)
        if(!task){
            res.status(404).json({msg:"Task not found"})
        }
        else{
            await TaskModel.findByIdAndDelete(taskId)
            res.status(201).json({msg:"Task Deleted"})
        }
    } catch (error) {
         res.status(500).json({msg:"Something went wrong."})
    }
}

module.exports ={deleteTask,getallTasks,updateTask,addTasks}

