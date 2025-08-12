let mongoose = require ('mongoose');
const noteSchema = new mongoose.Schema ({
  title: String,
  content: String,
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

const notesModel = mongoose.model ('Notes', noteSchema);

module.exports = notesModel;
