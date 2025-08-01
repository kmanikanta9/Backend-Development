let dataCheckMiddleware = (req, res, next) => {
  let { name, position, salary, status, department } = req.body;
  if (!name || !position || !salary || !status || !department) {
    return res
      .status(400)
      .json({ message: "Please Provide all Valid Fields.." });
  }
  next();
};
module.exports = dataCheckMiddleware;
