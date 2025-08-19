let express = require ('express');
const authMiddleware = require ('../middlewares/authMiddleware');
const OrderModel = require ('../models/orderModel');
let chefRouter = express.Router ();

// update order statuses

chefRouter.put (
  '/order-Preparing',
  authMiddleware ('chef'),
  async (req, res) => {
    try {
      let chef = req.user;
      let order = await OrderModel.findOne ({chef});
      if (!order) {
        // order not found
        return res.status (403).json ({message: 'order Not Found'});
      }
      //order found
      if(order.status=="Delivered"){
        return res.status(200).json({message:"order already Delivered"})
      }
      order.status = 'Preparing';
      await order.save ();
      res.status (200).json ({message: 'order updated'});
    } catch (error) {
      res.status (500).json ({message: error.message});
    }
  }
);

chefRouter.put (
  '/order-Out_for_Delivery',
  authMiddleware ('chef'),
  async (req, res) => {
    try {
      let chef = req.user;
      let order = await OrderModel.findOne ({chef});
      if (!order) {
        // order not found
        return res.status (403).json ({message: 'order Not Found'});
      }
      //order found
      if(order.status=="Delivered"){
        return res.status(200).json({message:"order already Delivered"})
      }
      order.status = 'Out for Delivery';
      await order.save ();
      res.status (200).json ({message: 'order updated'});
    } catch (error) {
      res.status (500).json ({message: error.message});
    }
  }
);

chefRouter.put (
  '/order-Delivered',
  authMiddleware ('chef'),
  async (req, res) => {
    try {
      let chef = req.user;
      let order = await OrderModel.findOne ({chef});
      if (!order) {
        // order not found
        return res.status (403).json ({message: 'order Not Found'});
      }
      //order found
      order.status = 'Delivered';
      await order.save ();
      res.status (200).json ({message: 'order updated'});
    } catch (error) {
      res.status (500).json ({message: error.message});
    }
  }
);
module.exports = chefRouter;
