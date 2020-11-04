const User = require('../models/User');

exports.user = async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email }).select('-password').exec(); 

      return res.json({success: true, user});
    } catch (err) {
      return next(err);
    }
  }