const express = require('express');
const router =  express.Router();

//logout user
router.post('/logout', async (req, res, next) => {
    try {
        req.session.destroy();   
        
        res.clearCookie('sessionId');
        res.redirect('/api/home');
          
      } catch(err) {
          if(err) {
              return res.redirect('/user').json({success: false, message: 'Session is not destroyed'});
            }
            return next(err);
          };
      })
  
  module.exports = router;