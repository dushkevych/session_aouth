const express = require('express');
const router =  express.Router();

const controller = require("../controllers/email-verify-controller");

//route   POST /api/logout
//desc    Logs user out and redirects to public page /api/home"
//access  Private

router.post('/email/verify', controller.verifyEmail)
  
module.exports = router;