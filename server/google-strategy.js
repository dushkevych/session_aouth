const express = require('express');
const router =  express.Router();

const { google } = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
const { compare } = require('bcryptjs');

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

router.get('/google/login', async (req, res, next) => {
    try {

        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
        });

        res.redirect(url);        
            
    } catch (err){
        next(err)
    }
})

router.get('/google/callback', async (req, res, next) => {
    try {
        const code = req.query.code;
  
            // Get an access token based on our OAuth code 
            const tokens = await oAuth2Client.getToken(code);
            console.log('Successfully authenticated');

            const tokenId = tokens.tokens.id_token;

            console.log(tokenId);

            const response = await oAuth2Client.verifyIdToken({idToken: tokenId, audience: process.env.CLIENT_ID})
            const { email_verified, name, email} = response.payload;

            console.log(response.payload)



            //oAuth2Client.setCredentials(tokens);
            //const tokenInfo = await oAuth2Client.getTokenInfo(tokens.tokens.id_token);
            //console.log(tokenInfo)
 
            // take a look at the scopes originally provisioned for the access token
            //console.log(tokenInfo.scopes);
 
        res.redirect('/api/home')
    } catch (err){
        next(err)
    }
  })

module.exports = router;

