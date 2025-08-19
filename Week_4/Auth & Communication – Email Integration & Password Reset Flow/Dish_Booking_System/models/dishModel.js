let mongoose = require ('mongoose');
let dishSchema = new mongoose.Schema ({
  dishname: {type: String, required: true},
  dishtype: {
    type: String,
    enum: ['tiffin', 'lunch', 'dinner', 'starter'],
    required: true,
  },
  price: {type: Number, required: true},
  createdBy : {type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

let DishModel = mongoose.model ('Dish', dishSchema);
module.exports = DishModel;
