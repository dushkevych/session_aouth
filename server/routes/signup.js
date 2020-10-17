const express = require('express');
const router =  express.Router();

const checkDuplicateEmail = require('../middleware/check-duplicate-email.js');
const controller = require('../controllers/signup-controller');

//@route   POST /api/auth/signup"
//@desc    Register new user
//@access  Public

router.post('/signup', controller.signup)

module.exports = router;