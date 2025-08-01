const { addOrUpdateTodo, getData } = require("../models/course.model");

const addTodo = (req, res) => {
  let newTodo = req.body;
  let data = getData().data;
  let todos = getData().todos;
  todos.push(newTodo);
  console.log(todos);
  addOrUpdateTodo(data);
  res.status(201).json({ msg: "Todo Added", newTodo });
};

const updateTodo = (req, res) => {
  let id = req.params.id;
  let update_todo = req.body;
  let data = getData().data;
  let todos = getData().todos;
  let index = todos.findIndex((todo) => todo.id == id);
  if (index == -1) {
    res.json({ msg: "The todo is not Found." });
  } else {
    let updateTodos = todos.map((el, i) => {
      if (el.id == id) {
        return { ...el, ...update_todo };
      } else {
        return el;
      }
    });
    data.todos = updateTodos;
    addOrUpdateTodo(data);
    res.json({ msg: "Todo Updated" });
  }
};

const deleteTodo = (req, res) => {
  let id = req.params.id;
  let data = getData().data;
  let todos = getData().todos;
  let index = todos.findIndex((todo) => todo.id == id);
  if (index == -1) {
    res.json({ msg: "The todo is not Found." });
  } else {
    let deletedTodo = todos.filter((todo) => todo.id != id);
    return deletedTodo;
  }
  data.todos = deletedTodo;
  addOrUpdateTodo(data);
  res.json({ msg: "Todo Deleted" });
};

const TodoName = (req, res) => {
  let title = req.query.title;

  let todos = getData().todos;

  todos.map((el, i) => {
    if (el.title.includes(title)) {
      res.json({ msg: "This is todo", todo: el });
    }
  });
};
const allTodos = (req, res) => {
  let todos = getData().todos;
  res.json({ msg: "All Todos", todos });
};

module.exports = { addTodo, deleteTodo, updateTodo, TodoName, allTodos };
