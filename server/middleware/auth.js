const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {

         //Check for session
        if (!req.session.user) {
            //return res.status(401).json({ message: 'No token, authorisation denied'})
            return res.status(401).json({ message: 'Session is not active, authorization denied'})
        };
        
        //Verify token, Add user from payload
        //req.user = jwt.verify(token, process.env.JWT_SECRET);
        
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