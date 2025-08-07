let express = require("express");
const {
  addUser,
  allUsers,
  getBookRenters,
} = require("../controllers/userController");
let userRouter = express.Router();

// add user
userRouter.post("/add-user", addUser);
// get all users
userRouter.get("/all-users", allUsers);
// get book renters
userRouter.get("/book-renters/:bookId", getBookRenters);

module.exports = userRouter;
