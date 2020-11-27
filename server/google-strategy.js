const express = require('express');
const router =  express.Router();

const User = require('./models/user');
const bcrypt = require('bcryptjs');

const {OAuth2Client} = require('google-auth-library');
const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

router.get('/google/login', async (req, res, next) => {
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
})

router.get('/google/callback', async (req, res, next) => {
    try {
        const code = req.query.code;

        //Get an access token based on our OAuth code 
        const tokens = await oAuth2Client.getToken(code);
        
        const idToken = tokens.tokens.id_token;
        //console.log("ID TOKEN:", idToken)

        const ticket = await oAuth2Client.verifyIdToken({ 
            idToken, 
            audience: process.env.CLIENT_ID
        });
            
        const payload = ticket.getPayload();
        console.log("PAYLOAD:", payload)    
        
        const { sub, email, given_name, family_name } = payload;
        // check if the user is already in database:
        const user = await User.findOne({ email }).exec(); 
       
        if (user) {
            //update users profile in db by adding gogggleId 
            //establish an authenticated session for the user:
            user.googleId = sub;
            await user.save();
            req.session.userId = user._id;
            console.log(req.session); 
        } else {
            // if there is no user create one, save in DB,
            // establish an authenticated session for the newUser: 
            const newUser = new User({
                firstName: given_name ,
                lastName: family_name,
                email,
                googleId: sub,
                password: bcrypt.hashSync(process.env.JWT_SECRET, 10)
              });
              await newUser.save();
              req.session.userId = newUser._id;
        }

        res.redirect('/api/user')
    } catch (err){
        next(err)
    }
  })

module.exports = router;