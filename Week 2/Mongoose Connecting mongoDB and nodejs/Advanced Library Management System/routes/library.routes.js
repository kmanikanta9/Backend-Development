

const express = require('express')
const { allBooks, updateBook, addBook, deleteBook, getBooks, borrowBook, returnBook } = require('../controllers/library.controller');
const validateBookData = require('../middleware/library.middleware');
const checkBorrowLimit = require('../middleware/checkBorrowLimit');

const libraryRouter = express.Router()

libraryRouter.post('/books', validateBookData, addBook);
libraryRouter.get('/books', getBooks);
libraryRouter.patch('/borrow/:id', checkBorrowLimit, borrowBook);
libraryRouter.patch('/return/:id', returnBook);
libraryRouter.delete('/books/:id', deleteBook);
module.exports = libraryRouter