const User = require('../models/user');
const bcrypt = require('bcryptjs');

const axios = require('axios');

exports.facebookLogin = async (req, res, next) => {
    try {

        const url = 'https://www.facebook.com/v9.0/dialog/oauth';
        
        const facebookLoginUrl = 
       `${url}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&scope=email&response_type=code&auth_type=rerequest&display=popup`
  
        res.redirect(facebookLoginUrl);        
    } catch (err) {
        next(err)
    }
};



exports.facebookLoginCallback = async (req, res, next) => {
    try {
        //Check which way is more reliable - code based or at once token based???
        const code = req.query.code;
        //Get an access token based on our OAuth code

        const tokenRequest = await axios.get('https://graph.facebook.com/v9.0/oauth/access_token', {
            params : {
                client_id:process.env.FACEBOOK_CLIENT_ID,
                redirect_uri:process.env.FACEBOOK_REDIRECT_URI,
                client_secret:process.env.FACEBOOK_SECRET,
                code:code
            }
        })
        
         // { access_token, token_type, expires_in }
         const {access_token} = tokenRequest.data

         //HTTP request with the access token to get the user’s data
         const userRequest = await axios.get('https://graph.facebook.com/me', {
              params: {
                fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                access_token,
                },
            });
          
        //   const { data } = userRequest
        //   console.log(data); // { id, email, first_name, last_name }
          
          const { id, email, first_name, last_name } = userRequest.data
          // check if the user is already in database:
          const user = await User.findOne({ email }).exec(); 
         
          if (user) {
              //update users profile in db by adding gogggleId 
              user.facebookId = id;
              await user.save();
              //establish an authenticated session for the user:
              req.session.userId = user._id;
            } else {
              // if there is no user create one, save in DB,
              const newUser = new User({
                  firstName: first_name,
                  lastName: last_name,
                  email,
                  googleId: null,
                  facebookId: id,
                  password: bcrypt.hashSync(process.env.JWT_SECRET, 10)
                });
                await newUser.save();
              // establish an authenticated session for the newUser
                req.session.userId = newUser._id;
          }
  
          res.redirect('/api/user')
      } catch (err){
          next(err)
      }
    }