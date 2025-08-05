const LibraryModel = require("../models/library.model")


const allBooks = async(req,res)=>{
    try {
        let books = await LibraryModel.find({})
        res.status(201).json({msg:"All Books",books})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong."})
    }
    
}

const addBook = async(req,res)=>{
    try {
        let book = await LibraryModel.create(req.body)
        res.status(201).json({msg:"Book Added",book})
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}

const updateBook = async(req,res)=>{
    try {
        let {bookId} = req.params;
        let book = await LibraryModel.findById(bookId)
        if(!book){
            res.status(404).json({msg:"Book not found"})
        }
        else{
            await LibraryModel.findByIdAndUpdate(bookId,req.body)
            res.status(200).json({msg:"Book Updated"})
        }
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}

// const deleteBook = async(req,res)=>{
//     try {
//         let {bookId} = req.params;
//         let book = await LibraryModel.findById(bookId)
//         if(!book){
//             res.status(404).json({msg:"Book not found"})
//         }
//         else{
//             await LibraryModel.findByIdAndDelete(bookId)
//         }
//     } catch (error) {
//         res.status(500).json({msg:"Something went wrong"})
//     }
// }
const getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    const query = {};
    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: 'i' };

    const books = await LibraryModel.find(query);
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving books' });
  }
};
const borrowBook = async (req, res) => {
  try {
    const book = await LibraryModel.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    if (book.status !== 'available') return res.status(409).json({ msg: 'Book not available' });

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    book.status = 'borrowed';
    book.borrowerName = req.body.borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    await book.save();

    res.status(200).json({ msg: 'Book borrowed', book });
  } catch (err) {
    res.status(500).json({ msg: 'Error borrowing book' });
  }
};

const returnBook = async (req, res) => {
  try {
    const book = await LibraryModel.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    if (book.status !== 'borrowed') return res.status(409).json({ msg: 'Book is not borrowed' });

    const returnDate = new Date();
    let overdueFees = 0;
    if (returnDate > book.dueDate) {
      const diffDays = Math.ceil((returnDate - book.dueDate) / (1000 * 60 * 60 * 24));
      overdueFees = diffDays * 10;
    }

    book.status = 'available';
    book.returnDate = returnDate;
    book.overdueFees = overdueFees;
    await book.save();

    res.status(200).json({ msg: 'Book returned', book });
  } catch (err) {
    res.status(500).json({ msg: 'Error returning book' });
  }
};
const deleteBook = async (req, res) => {
  try {
    const book = await LibraryModel.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    if (book.status === 'borrowed') return res.status(409).json({ msg: 'Cannot delete borrowed book' });

    await book.remove();
    res.status(200).json({ msg: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting book' });
  }
};

module.exports = { addBook, borrowBook, returnBook, getBooks, deleteBook };