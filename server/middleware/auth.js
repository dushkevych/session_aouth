const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = await req.headers["x-access-token"];

        //Check for token
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorisation denied'})
        };

        //Verify token, Add user from payload
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        
        next();

    } catch (err) {
        if(err.name === 'TokenExpiredError') {
            return res.status(403).json({success: false, message: 'Token expired'});
          }
      
          if(err.name === 'JsonWebTokenError') {
            return res.status(403).json({success: false, message: 'Invalida token provided'});
          }
          return next(err);
        };
    };

module.exports = auth;