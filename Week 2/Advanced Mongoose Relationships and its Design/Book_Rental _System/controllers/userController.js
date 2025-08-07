const userModel = require("../models/userModel");

let addUser = async (req, res) => {
  try {
    let user = await userModel.create(req.body);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

let allUsers = async (req, res) => {
  try {
    let allUsers = await userModel.find();
    res.status(200).json({ message: "Users", Users: allUsers });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

let getBookRenters = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    let users = await userModel
      .find({
        rentedBooks: { $in: bookId },
      })
      .populate("rentedBooks", "title author");
    console.log(users);
    if (users.length == 0) {
      return res.status(200).json({ message: "Book is not rented.." });
    }
    res.status(200).json({
      message: "Users who rented that book..",
      Users: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};
module.exports = { addUser, allUsers , getBookRenters };
