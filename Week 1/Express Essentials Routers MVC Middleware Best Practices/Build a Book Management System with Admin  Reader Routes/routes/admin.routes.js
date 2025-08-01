

const express=require('express')
const { allBooks, addBook, updateBook, deleteBook, bookByName } = require('../controllers/admin.controller')

const adminRouter = express.Router()


adminRouter.get('/all-books',allBooks)

adminRouter.post('/add-book',addBook)

adminRouter.put('/update-book/:id',updateBook)

adminRouter.delete('/delete-book/:id',deleteBook)

adminRouter.get('/book-name',bookByName)


module.exports = adminRouter