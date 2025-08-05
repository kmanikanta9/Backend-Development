

const express = require('express');
const TaskModel = require('../models/task.model');

const taskRouter = express.Router()

taskRouter.get('/', async(req,res)=>{
    let tasks = await TaskModel.find({})
    res.status(200).json({msg:"All Tasks",tasks})
})

taskRouter.post('/add-task',async(req,res)=>{
    try {
        let tasks = await TaskModel.create(req.body)
        res.status(201).json({msg:"Task Added",tasks})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
})
taskRouter.patch('/update-task/:id',async(req,res)=>{
    try {
        let {id} = req.params
        let task = await TaskModel.findById(id)
        if(!task){
            res.status(500).json({msg:"Task not found"})
        }
        else{
            await TaskModel.findByIdAndUpdate(id,req.body)
            res.json({msg:"Updated succesfully"})
        }
    } catch (error) {
        res.json({msg:"Something went wrong"})
    }
})
taskRouter.delete('/delete-task/:id',async(req,res)=>{
    try {
        let {id} = req.params
        let task = await TaskModel.findById(id)
        if(!task){
            res.status(500).json({msg:"Task not found"})
        }
        else{
            await TaskModel.findByIdAndDelete(id)
            res.json({msg:"Deleted succesfully"})
        }
    } catch (error) {
        res.json({msg:"Something went wrong"})
    }
})
module.exports = taskRouter;