


const express = require('express')
const TaskModel = require('../models/task.model')
const { getallTasks, addTasks, updateTask, deleteTask } = require('../controllers/task.controllers')
const dataCheckMiddleware = require('../middlewares/task.middleware')

const taskRouter = express.Router()


taskRouter.get('/',getallTasks)

taskRouter.post('/add-task',dataCheckMiddleware,addTasks)
taskRouter.patch('/update-task/:taskId',updateTask)

taskRouter.delete('/delete-task/:taskId',deleteTask)


module.exports = taskRouter