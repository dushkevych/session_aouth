const express = require('express');
const router =  express.Router();

const controller = require("../controllers/signin-controller");

//route   POST /api/signin"
//desc    Log in user
//access  Public

router.post('/signin', controller.signin)

module.exports = router;
