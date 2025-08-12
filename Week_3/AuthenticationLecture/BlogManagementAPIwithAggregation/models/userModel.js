let mongoose = require ('mongoose');
const userSchema = new mongoose.Schema ({
  name: String,
  email: {type: String, unique: true},
  password: String
});
let userModel = mongoose.model ('User', userSchema);
module.exports = userSchema;
