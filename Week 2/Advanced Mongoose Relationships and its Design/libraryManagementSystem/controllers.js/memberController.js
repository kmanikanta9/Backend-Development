const memberModel = require("../models/memberModel");

let addMember = async (req, res) => {
  try {
    await memberModel.create(req.body);
    res.status(201).json({ message: "Member Created" });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
};
let allMembersWhoBorrowedBook = async(req,res)=>{
  try {
    let bookId = req.params.bookId 
    let Members = await memberModel.find({borrowedBooks : {$in:bookId}}).populate("borrowedBooks" , "title author _id")
    res.status(200).json({message:"Members who borrowed Books.." , Members})
  } catch (error) {
     console.log("Error :", error.message);
    res.status(500).json({ Error: error.message });
  }
}
module.exports = { addMember , allMembersWhoBorrowedBook};
