const { readData, writeData, findIndex } = require("../models/adminModel");

let allBooks = (req, res) => {
  let books = readData();
  if (books.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library" });
  }
  res.status(200).json(books);
};

let addNewBook = (req, res) => {
  let newBook = req.body;
  let books = readData();
  let id = books.length == 0 ? 1 : books[books.length - 1].id + 1;
  newBook = { ...newBook, id: id, status: "available" };
  books.push(newBook);
  writeData(books);
  res.status(200).json({ message: "New Book added to Library" });
};

let deleteBookById = (req, res) => {
  let id = req.params.id;
  let books = readData();
  if (books.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library to delete" });
  }
  let index = findIndex(-1, books, id);
  if (index == -1) {
    return res.status(404).json({
      message: "No Books are available in Library to delete with that id.",
    });
  }
  let booksAfterDeletion = books.filter((book) => book.id != id);
  writeData(booksAfterDeletion);
  res.status(200).json({ message: "Book is Deleted.." });
};

let updateBookById = (req, res) => {
  let id = req.params.id;
  let updatedBook = req.body;
  let books = readData();
  if (books.length == 0) {
    return res
      .status(404)
      .json({ message: "No Books are available in Library to update" });
  }
  let index = findIndex(-1, books, id);
  if (index == -1) {
    return res.status(404).json({
      message: "No Books are available in Library to update with that id.",
    });
  }
  updatedBook = { ...updatedBook, id: id };
  books[index] = updatedBook;
  writeData(books);
  res.status(200).json({ message: "Book is Updated..." });
};

module.exports = { allBooks, addNewBook, deleteBookById, updateBookById };
