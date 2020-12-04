var mongoose = require('mongoose');
const User = require('../models/user');

exports.user = async (req, res, next) => {
    try {
      const { userId } = req.session;

      //const userId =mongoose.Types.ObjectId(id)
      
      const user = await User.findById(userId).select('-password').exec(); 

      return res.json({success: true, user});
    } catch (err) {
      return next(err);
    }
  }