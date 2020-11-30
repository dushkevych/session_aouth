const express = require('express');
const router =  express.Router();

const controller = require('../controllers/facebook-login-controller');

//route   GET /api/facebook/login"
//access  Public
router.get('/facebook/login', controller.facebookLogin );

//route   GET /api/facebook/callback
//access  Private
router.get('/facebook/callback', controller.facebookLoginCallback);

module.exports = router;