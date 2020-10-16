const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = async (req, res, next) => {
  try {
      const token = await req.headers["x-access-token"];
      
      if (!token) {
        return res.status(403).send({ message: "Missing token" });
      }
    
    // тут работает синхронно функция!  
    jwt.verify(token, config.secret);

  } catch (err) {
    if(err.name === 'TokenExpiredError') {
      return res.status(403).json({success: false, message: 'Token expired'});
    }

    if(err.name === 'JsonWebTokenError') {
      return res.status(403).json({success: false, message: 'Invalida token provided'});
    }
    return next(err);
  };
}


module.exports = verifyToken;