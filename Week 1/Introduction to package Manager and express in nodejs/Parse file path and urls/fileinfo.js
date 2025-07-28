const path = require('path');
const url=require('url')
const queryString=require('querystring')

function filePaths(){
    let filepathUrl="/fileinfo?filepath=folder/sample.txt"
    const parsedUrl = url.parse(filepathUrl);
    const queryParams = queryString.parse(parsedUrl.query);
    const filepath = queryParams.filepath;
    const fileName=path.basename(filepath)
    const fileExtension=path.extname(filepath)
    const filedirectory=path.dirname(filepath)
    return{fileName,fileExtension,filedirectory}
}
module.exports=filePaths

