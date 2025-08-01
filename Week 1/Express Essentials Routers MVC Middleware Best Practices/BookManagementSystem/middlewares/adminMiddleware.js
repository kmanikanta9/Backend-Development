let dataCheckMiddleware = (req, res, next) => {
  let { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ message: "Please provide All the fields.." });
  }
  next();
};

module.exports = { dataCheckMiddleware };
