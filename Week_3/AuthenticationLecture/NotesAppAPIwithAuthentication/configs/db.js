let mongoUrl = 'mongodb://127.0.0.1:27017/NotesAPIDataBase';
let mongoose = require ('mongoose');
let connectToDb = async () => {
  try {
    await mongoose.connect (mongoUrl);
    console.log ('Connected mongoDb to Node..');
  } catch (err) {
    console.log (err.message);
  }
};

module.exports = connectToDb;
