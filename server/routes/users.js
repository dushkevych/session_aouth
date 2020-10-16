const { Router } =  require('express');
const router = Router();

const auth = require('../middleware/auth')

// User Model
const User = require('../models/User');

//@route   GET api/users
//@desc    Get all users
//@access  Private

router.get('/users', auth, async (req, res, next) => {
  try {
    const users = await User.find().exec();

    return res.json({success: true, users});
  } catch (e) {
    return next(e);
  }
});

//module.exports.default = router;
module.exports = router;