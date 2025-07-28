const timers=require('timers')

function delayMessage(message,time){
    return new Promise((resovle)=>{
        setTimeout(()=>{
            resovle(message)
        },time)
    })
}

module.exports=delayMessage