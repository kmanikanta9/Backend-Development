let mongoose = require("mongoose");
let bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: String, required: true },
  genre: { type: String},
  rentedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

let bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;
