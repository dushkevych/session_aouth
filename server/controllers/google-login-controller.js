const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');

const {OAuth2Client, LoginTicket} = require('google-auth-library');
const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
  );

exports.googleLogin = async (req, res, next) => {
    try {
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
                ],
            prompt: 'consent',    
        });
        return res.redirect(url);        
    } catch (err) {
        next(err)
    }
};

exports.googleLoginCallback = async (req, res, next) => {
    try {
        let ticket;
        const { code } = req.query;
        //Get an access token based on our OAuth code 
        const tokens = await oAuth2Client.getToken(code);
        const idToken = tokens.tokens.id_token;
        
        try {
         ticket = await oAuth2Client.verifyIdToken({ 
           idToken, 
           audience: process.env.CLIENT_ID
        });
        }catch(e) {
        return res.status(401).json({ success: false, error: 'Invalid credentials provided' });
        }

        const payload = ticket.getPayload();
    
        const { sub, email, given_name, family_name } = payload;
        // check if the user is already in database:
        const user = await User.findOne({ email }).exec(); 

        // if user exists "SIGN IN"
        if (user) {
            console.log('User', user);
            //update users profile in db by adding gogggleId 
            if (!user.googleId) {
                user.googleId = sub;
                await user.save();
            }
            //establish an authenticated session for the user:
            req.session.userId = user._id;
          } else {
            // if user does not exist "SIGN UP"
            const newUser = new User({
                firstName: given_name ,
                lastName: family_name,
                email,
                googleId: sub,
                // пароль нужен только в local strategy
              });
              const {_id: newUserId} = await newUser.save();
              req.session.userId = newUserId;
        }
        return res.redirect('/api/user')
    } catch (err){
        return next(err)
    }
  }