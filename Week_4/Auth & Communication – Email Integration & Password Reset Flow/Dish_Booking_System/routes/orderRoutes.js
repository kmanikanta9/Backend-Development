let express = require ('express');
const orderMiddleware = require('../middlewares/orderMiddleware');
const OrderModel = require('../models/orderModel');
let orderRouter = express.Router ();
// place order -> user can place order
orderRouter.post("/place-order",orderMiddleware("user"),async(req,res)=>{
    try {
        let {dish,chef,orderedAt} = req.body 
        if(!dish || !chef ){
            return res.status(406).json({message:"Please provide all fields"})
        }
        let orderedUser = req.user
        if(!orderedAt){
            orderedAt = Date.now()
        }
        let newOrder = await OrderModel.create({dish,chef,user:orderedUser ,orderedAt})
        res.status(201).json({message:"order placed" , newOrder})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
module.exports = orderRouter;
