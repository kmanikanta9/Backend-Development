const fs=require("fs")

function readFileData(){
    const data=fs.readFileSync("./data.txt","utf-8")
    return data
}

function appendFileData(){
    fs.appendFile("./data.txt","This data is write from fn \n",(err)=>{
        if(err){
            return err
        }
        else{
             const data1=fs.readFileSync("./data.txt","utf-8")
             return data1
        }
    })
   
    
}
module.exports={readFileData,appendFileData}