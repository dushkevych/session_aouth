const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

exports.signin = async (req, res, next) => {
    try{
        const { email, password } = req.body;
    
      //Simple validation
      if (!email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields'});
      }
    
      //Check for existing user
      const user = await User.findOne({ email }).exec(); 
      
      if (!user) {
        return res.status(400).json({ msg: 'User does not exist '});
      }
    
      //Validate password
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });    
      }
    
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 86400});
      
      res.json({token, user})
    
      } catch(err) {
        next(err)
      }
    }