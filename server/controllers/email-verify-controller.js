const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// users email varification

// @route POST api/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.verifyEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email }).select('-password').exec();
  
      if (!user) return res.status(401)
        .json({message: `The email address ${email} is not associated with any account. Double-check your email address and try again.`});
      
        const { id, firstName, lastName } = user;
        //Generate and set emailVerifyToken
        const emailVerifyToken = jwt.sign( 
        { 
            id, 
            firstName, 
            lastName 
        }, 
            process.env.JWT_SECRET,
        {
            expiresIn: 60 * 30 //expires in half hour
        }); 
          
        let link = "http://" + req.headers.host + "/api/email/verify" + emailVerifyToken;
        
        const msg = {
          to: email,
          from: process.env.FROM_EMAIL,
          subject: "Email confirmation request",
          html: `<h1> Hi ${firstName} ${lastName} </h1>
                <h3>Please click on the following <a href=${link}> link </a>  to reset confirm your email.</h3>
                <h3>If you did not request email confirmation from SAAS-STARTUP, please ignore this email.</h3>`
              };

        try {
            await sgMail.send(msg);
            console.log('Email sent')
        } catch(error) {
            console.error(error)

        }
        
                
        res.status(200).json({message: 'Confirmation link has been sent to ' + email + '.'});
  
    } catch(err) {
      next(err)
    };
    }

// @route GET api/reset/:token
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.resetPage = async (req, res, next ) => { 
    try {  
      const resetPasswordToken = req.params.token;
      const { id, firstName, lastName } = jwt.verify(resetPasswordToken, process.env.JWT_SECRET)
        
      if (!id) 
      return res.status(401).json({message: 'Password reset token is invalid or has expired.'});
    
      //Redirect user to form with the email address
      res.json({ message: `Dear, ${firstName} ${lastName}, you are on a password reset page now.`})
  
    } catch (err) {
        if(err.name === 'TokenExpiredError') {
            return res.status(403).json({success: false, message: 'Token expired'});
          }
      
          if(err.name === 'JsonWebTokenError') {
            return res.status(403).json({success: false, message: 'Invalida token provided'});
          }
          return next(err);
        };
    }

// @route POST api/reset/:token
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res, next ) => { 
  try {
    const resetPasswordToken = req.params.token;
    const { password, confirmPassword } = req.body;
    
    const { id } = jwt.verify(resetPasswordToken, process.env.JWT_SECRET)
             
    if (!id) 
    return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

    const user = await User.findById(id).exec();

    //Set the new password
    user.password = bcrypt.hashSync(password, 10);

    await user.save();

    // send email
    const { email, firstName, lastName} = user
    const mailOptions = {
          to: email,
          from: process.env.FROM_EMAIL,
          subject: "Your password has been changed",
          html: `<h1> Hi ${firstName} ${lastName} </h1>
          <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`
        };
          
        await sgMail.send(mailOptions);
        res.status(200).json({message: 'Your password has been updated.'});
  } catch (err) {
    next (err)
  }
}