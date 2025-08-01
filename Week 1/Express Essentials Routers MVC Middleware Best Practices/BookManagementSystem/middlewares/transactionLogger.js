const { readData } = require("../models/readerModel");

let transactionalLogger = (req, res, next) => {
    let id = req.params.id
  let time = new Date().toISOString();
  let userName = req.body.userName;
//   let titleOfBook = req.body.title;
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
  let titleOfBook = books[index].title;
  console.log(`[${time}] ${userName} borrowed "${titleOfBook}"`);

  next();
};

module.exports = { transactionalLogger };
