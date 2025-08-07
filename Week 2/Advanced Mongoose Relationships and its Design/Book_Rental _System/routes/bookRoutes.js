let express = require("express");
const {
  addBook,
  allBooks,
  rentBook,
  returnBook,
  getUserRentals,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");
let bookRouter = express.Router();

// add book
bookRouter.post("/add-book", addBook);
// get all books
bookRouter.get("/all-books", allBooks);
// rent a book
bookRouter.post("/rent-book", rentBook);
// return a book
bookRouter.post("/return-book", returnBook);
// get user rentals
bookRouter.get("/user-rentals/:userId", getUserRentals);
// update book 
bookRouter.put('/update-book/:bookId',updateBook)
// delete Book 
bookRouter.delete('/delete-book/:bookId',deleteBook)


module.exports = bookRouter;
