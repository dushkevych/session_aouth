const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try{
        const { firstName, lastName, email, password } = req.body;
    
      //Simple validation
      if (!firstName || !lastName || !email ||!password ) {
        return res.status(400).json({ message: 'Please enter required fields'});
      }
    
      //Check for existing user
      // @todo везде если обращаешься к модели, и хочешь получить promise назад, хорошая практика писать "exec()" вконце
      const userEmail = await User.findOne({ email }).select('email').exec(); 
    
      if (userEmail) { 
        return res.status(400).json({ success: false, message: 'User allready exists '});
      }
    
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10)
      });
           
      await newUser.save();

      console.log('newUser', newUser)
       
      //const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 86400});
      req.session.userid = newUser.id
      
      console.log('req.session.userid:', req.session.userid )
      res.json({ message: "User was registered successfully!", newUser});
    
      } catch(err) {
        next(err)
      }
    }