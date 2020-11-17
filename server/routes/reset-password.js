const express = require('express');
const router =  express.Router();

const validation = require('./user/validation/reset-password');
const controller = require('../controllers/reset-password-controller');

//route   POST /api/recover
//desc    Sends e-mail to user with a link to reset a password"
//access  Public
router.post('/recover',
    validation.recoverEmail,
    validation.validate,
    controller.recoverEmail );

// @route GET api/reset/:token
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public 
router.get('/reset/:token',
    controller.resetPage );

// @route POST api/reset/:token
// @desc Reset Password
// @access Public
router.post('/reset/:token', 
  validation.resetPassword,
  validation.validate,
  controller.resetPassword );

module.exports = router;