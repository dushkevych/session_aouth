const express = require('express');
const router =  express.Router();

const controller = require("../controllers/email-verify-controller");

//route   POST /api/logout
//desc    Logs user out and redirects to public page /api/home"
//access  Private
router.post('/email/verify', controller.verifyEmail);

// @route GET api/verify/:token
// @desc Verify Email - Validate email confirmation token and shows the confirm email - veiw
// @access Public 
router.get('/email/verify/:token',
    controller.confirmationPage);

module.exports = router;