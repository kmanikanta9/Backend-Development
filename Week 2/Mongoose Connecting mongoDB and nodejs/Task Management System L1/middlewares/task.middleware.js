

const dataCheckMiddleware = (req,res,next)=>{
    const {title,priority,description,dueDate,completionDate,isCompleted} =req.body;
    if(!title || !priority || !description){
        return res.status(400).json({msg:"Incomplete Data Received."})
    }
    const validPriorites = ['low','medium','high']
    if(!validPriorites.includes(priority.toLowerCase())){
        return res.status(400).json({msg:"Priority Check"})
    }
    if(dueDate){
        const duedated = new Date(dueDate)
        if(isNaN(duedated.getTime())){
            return res.status(400).json({msg:"Invalid due date"})
        }
        req.body.dueDate =duedated
    }
    if(isCompleted == true || isCompleted =='true'){
        req.body.completionDate=new Date()
    }
    next()

}

module.exports = dataCheckMiddleware