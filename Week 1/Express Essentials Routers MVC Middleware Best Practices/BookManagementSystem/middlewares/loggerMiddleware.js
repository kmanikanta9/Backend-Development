let logerMiddleware = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`[${timeStamp}] ${req.method} ${req.originalUrl}`);

  next();
};

module.exports = { logerMiddleware };
