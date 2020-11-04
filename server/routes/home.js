const express = require('express');
const router =  express.Router();

//home page
router.get('/home', async (req, res, next) => {
    try {
        
    res.json({ message: "You are on a home page, please sign in or sign up"});
          
    } catch(err) {
        next(err)
      }
    })
  
module.exports = router;