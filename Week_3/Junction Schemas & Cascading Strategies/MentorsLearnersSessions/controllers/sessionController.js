
let addSession = async(req,res)=>{
    try {
        console.log(req.body)
        res.status(201).json({message:"Session Created"})
    } catch (error) {
        console.log(error.message);
    res.status(500).json({ message: error.message });
    }
}

module.exports = {addSession}