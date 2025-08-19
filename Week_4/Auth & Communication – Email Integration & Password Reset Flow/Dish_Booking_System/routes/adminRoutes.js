let express = require ('express');
const DishModel = require('../models/dishModel');
const authMiddleware = require('../middlewares/authMiddleware');
let adminRouter = express.Router ();



// get all dishes 
adminRouter.get("/all-dishes",authMiddleware("admin"),async(req,res)=>{
    try {
        let allDishes = await DishModel.find()
        if(allDishes.length==0){
            return res.status(200).json({message:"No dishes are there"})
        }
        res.status(200).json({message:"All Dishes",allDishes})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
module.exports = adminRouter;
