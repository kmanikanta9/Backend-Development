
const fs= require('fs')
const dataCheckMiddleware = (req,res,next)=>{
    let reqData =  `Method: ${req.method} | EndPoint:${req.url}`
    fs.appendFileSync('./logs.txt',reqData)
    next()
}

module.exports = dataCheckMiddleware