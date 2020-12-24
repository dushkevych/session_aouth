const bcrypt = require('bcryptjs');

const User = require('../models/user');

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

      req.session.userId = newUser._id 
      
      res.json({ message: "User was registered successfully!", newUser});
      
      } catch(err) {
        next(err)
      }
    }