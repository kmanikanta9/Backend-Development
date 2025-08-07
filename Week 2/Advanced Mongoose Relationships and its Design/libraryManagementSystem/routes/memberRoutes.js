let express = require("express")
const { addMember, allMembersWhoBorrowedBook } = require("../controllers.js/memberController")
let memberRouter = express.Router()

// addMember  
memberRouter.post('/add-member',addMember)
// get all members who borrowed book
memberRouter.get("/book-borrowers/:bookId",allMembersWhoBorrowedBook) 

module.exports = memberRouter