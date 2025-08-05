

const validateBookData = (req,res,next)=>{
    const {title,author} = req.body;
    if(!title || !author){
        return res.status(400).json({msg:"Incomplete Data"})
    }
    next()
}
module.exports = validateBookData