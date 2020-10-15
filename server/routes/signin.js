const express = require('express');
const router =  express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const controller = require("../controllers/auth.controller");

// User Model
const User = require('../models/User');

//@route   POST /api/auth/signin"
//@desc    Log in user
//@access  Public

router.post('/signin', controller.signin)