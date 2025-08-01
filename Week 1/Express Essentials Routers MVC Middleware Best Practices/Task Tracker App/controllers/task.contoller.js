

const fs =  require('fs')
const { getData, addOrUpdate } = require('../models/task.model')

const allTasks = (req,res)=>{
    const {data,tasks} =getData()
     res.status(201).json({msg:"All Tasks",tasks})

}

const addTask =  (req,res)=>{
    let newTask = req.body
    const {data,tasks}=getData()
    tasks.push(newTask)
    addOrUpdate(data)
    res.status(201).json({msg:"New Task Added",newTask})

}

const updateTask = (req,res)=>{
    let id = req.params.id
    let updatetask = req.body;
    const {data,tasks}=getData()

    let index = tasks.findIndex(task=>task.id==id)
    if(index==-1){
        res.status(404).json({msg:"The task is not found."})
    }
    else{
        let updatedTasks = tasks.map((el,i)=>{
            if(el.id==id){
                return {...el,...updatetask}
            }
            else{
                return el
            }
            
        })
        data.tasks = updatedTasks;
        addOrUpdate(data)
        res.status(201).json({msg:"Task updated",updatetask})
    }
    
}

const deleteTask = (req,res)=>{
    let id = req.params.id
    const {data,tasks}=getData()

    let index = tasks.findIndex(task=>task.id==id)
    if(index==-1){
        res.status(404).json({msg:"The task is not found."})
    }
    else{
        let deleteTask = tasks.filter(task=>task.id!=id)
        data.tasks = deleteTask;
        addOrUpdate(data)
        res.status(201).json({msg:"Task deleted"})
    }
    
}

const taskName = (req,res)=>{
    let title = req.query.title;

    const {data,tasks}=getData()
    
{
            tasks.forEach((el,i)=>{
                if(el.title.includes(title)){
                    res.status(200).json({msg:"Task Details",Task:el})
                }
            })}
    
}

module.exports = {taskName,updateTask,deleteTask,allTasks,addTask}