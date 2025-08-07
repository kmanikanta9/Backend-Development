let mongoose = require("mongoose");
let bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author: { type: String, required: true },
  status: { type: String, required: true, enum: ["available", "borrowed"] ,default:"available"},
  borrowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  createdAt: { type: Date, default: new Date() },
});
let bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;
