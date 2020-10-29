const express = require('express');
const router =  express.Router();

const controller = require("../controllers/signin-controller");

//@route   POST /api/auth/signin"
//@desc    Log in user
//@access  Public
router.post('/signin', controller.signin)

module.exports = router;

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );
