let mongoose = require ('mongoose');
const blogSchema = new mongoose.Schema ({
  title: String,
  content: String,
  tags: [String],
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
let blogModel = mongoose.model ('Blog', blogSchema);
module.exports = blogModel;
