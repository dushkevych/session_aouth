const express = require('express');
const router =  express.Router();

const controller = require('../controllers/signup-controller');

//route   POST /api/signup"
//desc    Register new user
//access  Public

router.post('/signup', controller.signup)

module.exports = router;