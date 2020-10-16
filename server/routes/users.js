const { Router } =  require('express');
// User Model
const User = require('../models/User');

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().exec();

    return res.json({success: true, users});
  } catch (e) {
    return next(e);
  }
});

//module.exports.default = router;
module.exports = router;