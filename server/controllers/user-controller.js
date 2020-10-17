const User = require('../models/User');

exports.user = async (req, res, next) => {
    try {
      const { id } = req.user;
  
      const user = await User.findById(id).select('-password').exec();
  
      return res.json({success: true, user});
    } catch (err) {
      return next(err);
    }
  }