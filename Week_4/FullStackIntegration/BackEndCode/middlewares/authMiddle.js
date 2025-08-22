const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMid = (role) => {
  return (req, res, next) => {
    try {
      let token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token Not Found" });
      }

      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      if (!role.includes(decoded.role)) {
        return res.status(403).json({ error: "Access Denied!" });
      }

      req.userId = decoded.userId;
req.role = decoded.role;

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        try {
          let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
          if (!refreshToken) {
            return res.status(401).json({ message: "Refresh Token Not Found" });
          }

          let refreshValid = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
          if (!refreshValid) {
            return res.status(401).json({ message: "Refresh Token Invalid" });
          }
		  //console.log(refreshValid)

          // Generate new access token
          let newAccess = jwt.sign(
            { userId: refreshValid.userId, role: refreshValid.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 300 }
          );

          // ✅ Send new token in header
          res.setHeader("x-access-token", newAccess);

          // Attach user info for next middleware
          req.userId = refreshValid.userId;
req.role = refreshValid.role;


          return next();
        } catch (refreshErr) {
          return res.status(401).json({ message: "Token Expired, Please Login again!" });
        }
      } else {
        return res.status(401).json({ message: "Authentication Failed", error: err.message });
      }
    }
  };
};

module.exports = { authMid };
