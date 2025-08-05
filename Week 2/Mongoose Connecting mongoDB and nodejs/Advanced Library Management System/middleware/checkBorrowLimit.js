const LibraryModel = require("../models/library.model");

const checkBorrowLimit = async(req,resizeBy,next)=>{
    const {borrowerName} = req.body;
    const count = await LibraryModel.countDocuments({borrowerName,status:'borrowed'})
    if(count>=3){
        return res.status(409).json({msg:"Borrowing limit exceeded (max 3 books)"})
    }
    next()
}

module.exports = checkBorrowLimit