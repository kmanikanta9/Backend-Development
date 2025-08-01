
const dataCheck =  (req,res,next)=>{

    const {title, description, priority, user} = req.body;
    if(!title && !description && !priority && ! user){
        res.status(406).json({msg:"Data insufficient, please provide al required fields"})
    }
    else{
        next()
    }
}

module.exports = dataCheck