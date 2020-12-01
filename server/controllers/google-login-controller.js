const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');

const {OAuth2Client} = require('google-auth-library');
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
                ]
        });
        res.redirect(url);        
    } catch (err) {
        next(err)
    }
};

exports.googleLoginCallback = async (req, res, next) => {
    try {
        const code = req.query.code;
        //Get an access token based on our OAuth code 
        const tokens = await oAuth2Client.getToken(code);
        const idToken = tokens.tokens.id_token;
        
        const ticket = await oAuth2Client.verifyIdToken({ 
            idToken, 
            audience: process.env.CLIENT_ID
        });
            
        const payload = ticket.getPayload();
       
        const { sub, email, given_name, family_name } = payload;
        // check if the user is already in database:
        const user = await User.findOne({ email }).exec(); 
       
        if (user) {
            //update users profile in db by adding gogggleId 
            if (!user.googleId) {
            user.googleId = sub;
            await user.save();
            }
        
            //establish an authenticated session for the user:
            req.session.userId = user._id;
            console.log(req.session.userId)
          } else {
            // if there is no user create one, save in DB,
            const newUser = new User({
                firstName: given_name ,
                lastName: family_name,
                email,
                googleId: sub,
                facebookId: null,
                password: bcrypt.hashSync(process.env.JWT_SECRET, 10)
              });
              await newUser.save();
            // establish an authenticated session for the newUser
            const newUserId = await User.findOne({ email }).select('_id').exec()
            console.log('newUserid:', newUserId) 
            req.session.userId = newUserId; 
            console.log('req.session.userId:', req.session.userId) 
        }

        res.redirect('/api/user')
    } catch (err){
        next(err)
    }
  }