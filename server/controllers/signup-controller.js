const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
    
      //Simple validation
      if (!username || !email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields'});
      }
    
      //Check for existing user
      // @todo везде если обращаешься к модели, и хочешь получить promise назад, хорошая практика писать "exec()" вконце
      const userEmail = await User.findOne({ email }).select('email').exec(); 
    
      if (userEmail) { 
        return res.status(400).json({ success: false, message: 'User allready exists '});
      }
    
      const newUser = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 10)
      });
           
      await newUser.save();
       
      const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 86400})  
      
      res.json({ message: "User was registered successfully!",token, newUser})
    
      } catch(err) {
        next(err)
      }
    };