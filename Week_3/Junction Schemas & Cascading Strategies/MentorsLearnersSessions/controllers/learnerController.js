const learnerModel = require("../models/learnerSchema");


let addLearner = async(req,res)=>{
    try {
        let learner = await learnerModel.create(req.body) 
        res.status(201).json({message:"Learner Added",learner})
    } catch (error) {
        console.log(error.message);
    res.status(500).json({ message: error.message });
    }
}

module.exports = {addLearner}