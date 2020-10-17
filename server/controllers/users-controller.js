const User = require('../models/User');

exports.users = async (req, res, next) => {
    try {
      const users = await User.find().exec();
  
      return res.json({success: true, users});
    } catch (err) {
      return next(err);
    }
  }