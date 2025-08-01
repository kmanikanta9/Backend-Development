const { readData, findDiffInDays } = require("../models/readerModel");

let returnCheckMiddleware = (req, res, next) => {
  let id = req.params.id;
  let books = readData();
  if (books.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library" });
  }
  let index = books.findIndex((book) => book.id == id);
  if (index == -1) {
    return res.status(404).json({ message: "Book not Found.." });
  }

  let bookBorrowedDate = new Date(books[index].borrowedDate);
  let currentDate = new Date();

  let diffInMs = currentDate - bookBorrowedDate;
  let diffInDaysOfBorrowingAndReturing = diffInMs / (1000 * 60 * 60 * 24);
//   let diffInDaysOfBorrowingAndReturing = findDiffInDays(
//     books[index].bookBorrowedDate
//   );
  if (diffInDaysOfBorrowingAndReturing < 3) {
    return res.status(400).json({
      error: "Book cannot be returned within 3 days of borrowing.",
    });
  }

  next();
};

module.exports = { returnCheckMiddleware };
