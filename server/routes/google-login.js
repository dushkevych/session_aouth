const express = require('express');
const router =  express.Router();

const controller = require('../controllers/google-login-controller');

//route   GET /api/google/login"
//access  Public
router.get('/google/login', controller.googleLogin );

//route   GET /api/google/callback"
//access  Private
router.get('/google/callback', controller.googleLoginCallback);

module.exports = router;
