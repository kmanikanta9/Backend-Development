const mongoose = require("mongoose");
const resourceModel = require("../models/resourceModel");


const getAllResources = async (req, res) => {
  try {
    let resources;
    if (req.role === "user") {
      // Users only see their own resources
      resources = await resourceModel.find({ createdBy: req.userId });
    } else {
      // Admins & Moderators see all resources
      resources = await resourceModel.find();
    }
    res.status(200).json({ resources });
  } catch (err) {
    res.status(500).json({ Error: "Error fetching resources", Err: err.message });
  }
};



const addResource = async(req,res)=>{
	try{      console.log(req.user,req.role);
              let rest = { ...req.body, createdBy: req.userId };
			  console.log(rest) // ✅ Use only userId
              let resource = await resourceModel.create(rest);
			  res.status(201).json({Message:`Rourse added Successfullly,`,resource});
	}
	catch(err){
		res.status(404).json({Error:"Error in adding  a Resource",Err:err.message});
	}
}


// DELETE /admin/resources/:id
const deleteResource = async (req, res) => {
  try {
	 //console.log(req.user)

	 if(req.role=="user"){
    const resource = await resourceModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId, // user can only delete their own resource
    });

    if (!resource) {
      return res.status(403).json({ Error: "Not authorized or resource not found" });
    }

    res.status(200).json({ Message: "Resource deleted successfully" });
}else{
	const resource = await resourceModel.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({ Error: "Resource not found" });
    }

    res.status(200).json({ Message: "Resource deleted successfully" });
}
  } catch (err) {
    res.status(500).json({ Error: "Error deleting resource", Err: err.message });
  }
};






module.exports = {
	addResource,
	deleteResource,
	getAllResources,
}