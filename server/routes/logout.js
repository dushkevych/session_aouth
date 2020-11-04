const express = require('express');
const router =  express.Router();

const controller = require("../controllers/logout-controller");

//route   POST /api/logout
//desc    Logs user out and redirects to public page /api/home"
//access  Private

router.post('/logout', controller.logout)
  
module.exports = router;