let express = require ('express');
const authMiddleware = require('../middlewares/authMiddleware');
const DishModel = require('../models/dishModel');
let dishRouter = express.Router ();

// add dish -> Only admin  can add the dish
dishRouter.post("/add-dish",authMiddleware("admin"),async(req,res)=>{
    try {
       let  {dishname , dishtype , price} = req.body
       if(!dishname || !dishtype || !price){
        return res.status(402).json({message:"All fields are required"})
       }
       let createdBy = req.user
       let newDish = await DishModel.create({dishname , dishtype , price,createdBy})
       res.status(201).json({message:"dish Created" , newDish})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
module.exports = dishRouter;
