let roleCheckMiddleware = (req, res, next) => {
  let url = req.url;
  let urlBySplitting = url.split("/")
  console.log("Role :",urlBySplitting[1] );
  next();
};
module.exports = roleCheckMiddleware;
