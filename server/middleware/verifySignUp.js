const User = require("../models/User")

const checkDuplicateEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const { email: userEmail} = await User.findOne({email }).select('email').exec();

      if (userEmail) {
        return res.status(400).json({ success:false, message: 'Email must be unique!' });
      }

      return next();
  } catch (err) {
    throw err;
  };
}; 

module.exports = checkDuplicateEmail;