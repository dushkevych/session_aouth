const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth')
// User Model
const User = require('../models/User');

/**
 * @route   GET api/user
 * @desc    Get user by id
 * @access  Private
 */

router.get('/user', auth, async (req, res, next) => {
  try {
    const { id } = req.user;

    console.log(req)

    const user = await User.findById(id).select('-password').exec();

    return res.json({success: true, user});
  } catch (e) {
    return next(e);
  }
});

module.exports = router;