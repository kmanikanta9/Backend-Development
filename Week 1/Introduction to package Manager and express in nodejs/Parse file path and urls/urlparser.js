

const url = require('url');
const querystring = require('querystring');
function fileurl(fullUrl){
    // let filepathurl="/parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks";
    const parsedUrl=url.parse(fullUrl)
    const queryParams= querystring.parse(parsedUrl.query)
    return{
        hostname:parsedUrl.hostname,
        pathname:parsedUrl.pathname,
        query:queryParams
    }
}
module.exports=fileurl