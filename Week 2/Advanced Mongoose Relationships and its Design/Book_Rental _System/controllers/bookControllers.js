const bookModel = require("../models/bookModels");
const userModel = require("../models/userModel");

let addBook = async (req, res) => {
  try {
    await bookModel.create(req.body);
    res.status(201).json({ message: "Book Added.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

let allBooks = async (req, res) => {
  try {
    let books = await bookModel.find();
    res.status(201).json({ message: "Books", Books: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};
let rentBook = async (req, res) => {
  try {
    let { userId, bookId } = req.body;
    let user = await userModel.findById(userId);
    console.log(user);
    let book = await bookModel.findById(bookId);
    console.log(book);
    if (!book) {
      return res.status(200).json({ message: "Book is not found" });
    }
    if (!user) {
      return res.status(200).json({ message: "User is not found" });
    }
    if (book.rentedBy.includes(userId)) {
      return res.status(200).json({
        message: "User is already rented the book with that BookId..",
      });
    }
    user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);
    await book.save();
    await user.save();
    res.status(200).json({ message: "book rented successfully.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

let returnBook = async (req, res) => {
  try {
    let { userId, bookId } = req.body;
    let user = await userModel.findById(userId);
    console.log(user);
    let book = await bookModel.findById(bookId);
    console.log(book);
    if (!book) {
      return res.status(200).json({ message: "Book is not found" });
    }
    if (!user) {
      return res.status(200).json({ message: "User is not found" });
    }
    if (!book.rentedBy.includes(userId)) {
      return res.status(200).json({
        message: "book is not rented by thet user With that userId..",
      });
    }
    book.rentedBy = book.rentedBy.filter(
      (rentedUserId) => rentedUserId.toString() != userId
    );
    user.rentedBooks = user.rentedBooks.filter(
      (rentedBookId) => rentedBookId.toString() != bookId
    );
    await user.save();
    await book.save();
    res.status(200).json({ message: "Book Returned.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

let getUserRentals = async (req, res) => {
  try {
    let userId = req.params.userId;
    let books = await bookModel
      .find({
        rentedBy: { $in: userId },
      })
      .populate("rentedBy", "name");
    if (books.length == 0) {
      return res.status(200).json({ message: "User is not rented any book" });
    }
    res.status(200).json({
      message: "Books which are rented by that user...",
      Books: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

let updateBook = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    let updatedBook = await bookModel.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Book is updated...", updatedBook });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};
let deleteBook = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    await userModel.updateMany(
      { rentedBooks: bookId },
      { $pull: { rentedBooks: bookId } }
    );
    let book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book is not found to delete" });
    }
    let deletedBook = await bookModel.findByIdAndDelete(bookId);
    res
      .status(200)
      .json({ message: "Book is deleted..", DeletedBook: deletedBook });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

module.exports = {
  addBook,
  allBooks,
  rentBook,
  returnBook,
  getUserRentals,
  updateBook,
  deleteBook,
};
