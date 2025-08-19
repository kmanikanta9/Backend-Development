let mongoose = require ('mongoose');
let orderSchema = new mongoose.Schema ({
  dish: {type: mongoose.Schema.Types.ObjectId, ref: 'Dish',required:true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true},
  chef: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
  status: {
    type: String,
    enum: ['Order Received', 'Preparing', 'Delivered', 'Out for Delivery'],
    default: 'Order Received',
  },
  orderedAt: {type: Date, default: Date.now ()},
});
let OrderModel = mongoose.model ('Order', orderSchema);
module.exports = OrderModel;
