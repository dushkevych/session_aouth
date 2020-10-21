const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth')
const controller = require("../controllers/user-controller");

//  @route   GET api/user
//  @desc    Get user by id
//  @access  Private

router.get('/user', auth, controller.user);

module.exports = router;