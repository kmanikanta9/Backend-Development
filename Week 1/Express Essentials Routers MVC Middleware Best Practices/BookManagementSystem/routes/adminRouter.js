let express = require("express");
const {
  allBooks,
  addNewBook,
  deleteBookById,
  updateBookById,
} = require("../controllers/adminController");
const { dataCheckMiddleware } = require("../middlewares/adminMiddleware");

let adminRouter = express.Router();

// get all books
adminRouter.get("/books", allBooks);
// add new book
adminRouter.post("/books", dataCheckMiddleware, addNewBook);
// delete book by id
adminRouter.delete("/books/:id", deleteBookById);
// update book by id
adminRouter.patch("/books/:id", updateBookById);

module.exports = { adminRouter };
