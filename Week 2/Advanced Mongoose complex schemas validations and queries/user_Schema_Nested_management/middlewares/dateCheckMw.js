let dataCheckMW = (req, res, next) => {
  let id = req.params.userId;
  let name = req.params.profileName;
  if (!id || !name) {
    return res
      .status(405)
      .json({ message: "Please Provide userId and profilename" });
  }
  next();
};
module.exports = dataCheckMW;
