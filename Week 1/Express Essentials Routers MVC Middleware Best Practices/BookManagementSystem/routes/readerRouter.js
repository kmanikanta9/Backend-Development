let express = require("express");
const {
  allAvailableBooks,
  borrowingABookById,
  returnBookById,
} = require("../controllers/readerController");
const {
  returnCheckMiddleware,
} = require("../middlewares/returnCheckMiddleware");
const { transactionalLogger } = require("../middlewares/transactionLogger");

let readerRouter = express.Router();

// get all available books
readerRouter.get("/books", allAvailableBooks);
// borrowing a book by id
readerRouter.post("/borrow/:id", transactionalLogger, borrowingABookById);
// return book by id after 3 days
readerRouter.post(
  "/return/:id",
  returnCheckMiddleware,
  transactionalLogger,
  returnBookById
);

module.exports = { readerRouter };
