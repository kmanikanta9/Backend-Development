let express = require("express");
const {
  addBook,
  borrowBook,
  returnBook,
  getMemberBorrowedBooks,
  updateBook,
} = require("../controllers.js/bookController");
let bookRouter = express.Router();

// add Book
bookRouter.post("/add-book", addBook);
// borrow book
bookRouter.post("/borrow-book", borrowBook);
// return book
bookRouter.post("/return-book", returnBook);
// get member borrowed books
bookRouter.get("/member-borrowed-books/:memberId", getMemberBorrowedBooks);
// update Book
bookRouter.put("/update-book/:bookId",updateBook)
module.exports = bookRouter;
