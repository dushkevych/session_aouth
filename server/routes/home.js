const express = require('express');
const router =  express.Router();

const controller = require("../controllers/home-controller");

//route   GET /api/home"
//desc    Home Page
//access  Public

router.get('/home', controller.home)
  
module.exports = router;