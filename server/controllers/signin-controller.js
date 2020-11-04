const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/User');

exports.signin = async (req, res, next) => {
    try{
        const { email, password } = req.body;
    
      //Simple validation
      if (!email || !password ) {
        return res.status(400).json({ message: 'Please enter required fields'});
      }
    
      //Check for existing user
      const user = await User.findOne({ email }).exec(); 
      
      if (!user) {
        return res.status(400).json({ message: 'User does not exist '});
      }
    
      //Validate password
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });    
      }

      req.session.user = user
     
      res.json({user})
    
      } catch(err) {
        next(err)
      }
    }