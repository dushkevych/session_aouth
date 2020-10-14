const express = require('express');
const router =  express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

//@route   POST /api/auth/signup"
//@desc    Register new user
//@access  Public

router.post('/signup', async (req, res, next) => {
try{
    const { username, email, password } = req.body;

  //Simple validation
  if (!username || !email || !password ) {
    return res.status(400).json({ msg: 'Please enter all fields'});
  }

  //Check for existing user
  const user = await User.findOne({ email }); 
  if (user) return res.status(400).json({ msg: 'User allready exists '});

  const newUser = new User({
    username,
    email,
    password
  });
  
  // Create a salt and hash
  newUser.password = bcrypt.hashSync(password, 10);
  const savedUser = await newUser.save();

  const token = jwt.sign({id: savedUser.id}, process.env.JWT_SECRET, {expiresIn: 86400})  
  
  res.json({token, savedUser})

  } catch(err) {
    next(err)
  }
})

module.exports = router;