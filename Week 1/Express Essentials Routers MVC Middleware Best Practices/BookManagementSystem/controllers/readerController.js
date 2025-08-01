const { readData, writeData } = require("../models/readerModel");

let allAvailableBooks = (req, res) => {
  let books = readData();
  if (books.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library" });
  }
  let availableBooks = books.filter((book) => book.status === "available");
  if (availableBooks.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library" });
  }
  res.status(200).json(availableBooks);
};

let borrowingABookById = (req, res) => {
  let id = req.params.id;
  let { userName } = req.body;
  let books = readData();
  if (books.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library" });
  }
  let index = books.findIndex(
    (book) => book.id == id && book.status == "available"
  );
  if (index == -1) {
    return res.status(404).json({
      message: "No Books are available in Library with that id to borrow",
    });
  }
  books[index] = {
    ...books[index],
    status: "borrowed",
    borrowedBy: userName,
    borrowedDate: new Date().toISOString(),
  };
  console.log(books);
  writeData(books);
  res.status(200).json({ message: "Book is borrowed.." });
};

let returnBookById = (req, res) => {
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
  let { borrowedBy, borrowedDate, ...updatedBook } = books[index];
  books[index] = { ...updatedBook, status: "available" };
  writeData(books);
  res.status(200).json({ message: "Book is returned.." });
};

module.exports = { allAvailableBooks, borrowingABookById, returnBookById };
