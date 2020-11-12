const express = require('express');
const router =  express.Router();

const controller = require('../controllers/signup-controller');
const validation = require('../routes/user/validation/createUser');

//route   POST /api/signup"
//desc    Register new user
//access  Public

router.post('/signup',
      validation.signUpValidationChain, 
      validation.validateSignUp, 
      controller.signup )

module.exports = router;
