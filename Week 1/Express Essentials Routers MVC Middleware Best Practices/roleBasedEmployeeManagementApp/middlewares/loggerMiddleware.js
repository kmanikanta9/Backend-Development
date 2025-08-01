let loggerMiddleware = (req, res, next) => {
  let time = new Date().toISOString();
  let method = req.method;
  let URL = req.url;
  console.log(`timestamp : [${time}], Method: ${method},EndPoints: ${URL} `);
  next()
};
module.exports = loggerMiddleware;
