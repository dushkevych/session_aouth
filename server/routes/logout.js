const express = require('express');
const router =  express.Router();

//logout user
router.post('/logout', async (req, res, next) => {
    try {
         req.session.destroy()
         
          console.log(req.session)
      
          //res.clearCookie(sessionId)
          res.redirect('/api/login').json({message:'Logged out'})
          console.log(req.session)
        
      } catch(err) {
          if(err.name === 'Check for proper error name') {
              return res.redirect('/user').json({success: false, message: 'Session is not destroyed'});
            }
            return next(err);
          };
      })
  
  module.exports = router;