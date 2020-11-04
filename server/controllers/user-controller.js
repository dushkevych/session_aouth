const User = require('../models/User');

exports.user = async (req, res, next) => {
    try {
      const { userId } = req.session;

      const user = await User.findById(userId).select('-password').exec(); 

      return res.json({success: true, user});
    } catch (err) {
      return next(err);
    }
  }