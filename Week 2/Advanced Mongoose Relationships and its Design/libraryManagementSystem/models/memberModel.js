let mongoose = require("mongoose");
let memberSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
});
let memberModel = mongoose.model("Member", memberSchema);
module.exports = memberModel;
