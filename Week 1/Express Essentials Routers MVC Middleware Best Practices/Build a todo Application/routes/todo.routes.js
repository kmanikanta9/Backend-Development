


const express=require('express')
const { addTodo, updateTodo, deleteTodo, TodoName, allTodos } = require('../controllers/todo.controller')
const todoRouter = express.Router()



todoRouter.get('/all-todos',allTodos)

todoRouter.post("/add-todo",addTodo)

todoRouter.put('/update-todo/:id',updateTodo)

todoRouter.delete('/delete-todo/:id',deleteTodo)

todoRouter.get('/todo-title',TodoName)



module.exports = todoRouter;
