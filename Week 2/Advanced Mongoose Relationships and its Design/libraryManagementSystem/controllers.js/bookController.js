const bookModel = require("../models/bookModel");
const memberModel = require("../models/memberModel");

let addBook = async (req, res) => {
  try {
    await bookModel.create(req.body);
    res.status(201).json({ message: "Book Created" });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
};
let borrowBook = async (req, res) => {
  try {
    let { memberId, bookId } = req.body;
    let book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(200).json({ message: "Book is not found" });
    }
    let Member = await memberModel.findById(memberId);
    if (!Member) {
      return res.status(200).json({ message: "Member is not found" });
    }
    if (book.borrowers.includes(memberId)) {
      return res
        .status(200)
        .json({ message: "Member is already borrowed that book..." });
    }
    book.status = "borrowed";
    book.borrowers.push(memberId);
    Member.borrowedBooks.push(bookId);
    await book.save();
    await Member.save();
    res.status(200).json({ message: "Book is Borrowed.." });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
};

let returnBook = async (req, res) => {
  try {
    let { memberId, bookId } = req.body;
    let book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(200).json({ message: "Book is not found" });
    }
    let Member = await memberModel.findById(memberId);
    if (!Member) {
      return res.status(200).json({ message: "Member is not found" });
    }
    if (!book.borrowers.includes(memberId)) {
      return res
        .status(200)
        .json({ message: "Member is not borrowed this bookk.." });
    }
    book.status = "available";
    book.borrowers = book.borrowers.filter(
      (borrowedMemberId) => borrowedMemberId.toString() != memberId
    );
    Member.borrowedBooks = Member.borrowedBooks.filter(
      (borrowedBookId) => borrowedBookId.toString() != bookId
    );
    await book.save();
    await Member.save();
    res.status(200).json({ message: "Book is returned.." });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
};

let getMemberBorrowedBooks = async (req, res) => {
  try {
    let memberId = req.params.memberId;
    let member = await memberModel.findById(memberId , {name:1 , email:1 })
    let Books = await bookModel.find({ borrowers: { $in: memberId } });
    if(Books.length==0){
      return res.status(200).json({message:"Member is not borrowed any book"})
    }
    res.status(200).json({ message: "All Books Borrowed by Member..", member,borrowedBooks:Books });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
};
let updateBook = async(req,res)=>{
  try {
    let bookId = req.params.bookId 
    let Book = await bookModel.findByIdAndUpdate(bookId , req.body , {new:true})
    res.status(200).json({message:"Book is Updated.." , updatedBook : Book})
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
}
module.exports = { addBook, borrowBook, returnBook, getMemberBorrowedBooks , updateBook };
