let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  rentedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ], //  Array of ObjectIds (references to the Book collection)
});

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;
