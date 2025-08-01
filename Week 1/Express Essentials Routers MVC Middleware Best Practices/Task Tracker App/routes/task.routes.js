

const express =  require('express')
const { allTasks, addTask, updateTask, deleteTask, taskName } = require('../controllers/task.contoller')

const taskRouter = express.Router()

taskRouter.get('/all-tasks',allTasks)

taskRouter.post('/add-task',addTask)

taskRouter.put('/update-task/:id',updateTask)

taskRouter.delete('/delete-task/:id',deleteTask)

taskRouter.get('/task-title',taskName)

module.exports = taskRouter