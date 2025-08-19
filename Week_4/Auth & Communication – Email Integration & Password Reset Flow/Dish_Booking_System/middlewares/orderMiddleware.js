var jwt = require ('jsonwebtoken');
require ('dotenv').config ();
let orderMiddleware = role => {
  return async (req, res, next) => {
    try {
      // token will come from headers and need to check role to do Protected CRUD
      let token = req.headers.authorization.split (' ')[1];
      //   console.log ('token:', token);
      if (token) {
        var decoded = jwt.verify (token, process.env.jwt_security_key);
        // console.log (decoded);
        // role checking
        req.user = decoded.userId;
        if (role == decoded.role) {
          // role matches
          next ();
        } else {
          // role not matches
          res.status (400).json ({message: 'UnAuthorised'});
        }
      }
    } catch (error) {
      if (error.message == 'jwt expired') {
        return res
          .status (400)
          .json ({message: 'Token expired , please login again'});
      }
      res.status (500).json ({message: error.message});
    }
  };
};

module.exports = orderMiddleware;
