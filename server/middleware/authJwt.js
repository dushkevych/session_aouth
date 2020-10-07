const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = async (req, res, next) => {
  try {
      let token = await req.headers["x-access-token"];
      
      if (!token) {
        return res.status(403).send({ message: "No token provided!" });
        }
 
  jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });

  } catch (err) {
    console.log('DB CONNECTION ERROR');
    throw err;
  };

const authJwt = {
  verifyToken
};
module.exports = authJwt;