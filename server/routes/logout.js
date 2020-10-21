const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth')
//const controller = require("../controllers/logout-controller");

//logout user
app.post('/api/logout', auth, async (req, res, next) => {
    try {
        //Check for token
        const { token } = req.user;

         if (token) {
            req.headers["x-access-token"] = null;
            return res.redirect('/api/login').json({ msg: 'Logged out'})
        };
        
      return res.json({success: true, user});
    } catch (err) {
      return next(err);
    }
  }


function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });

}); 

//delete token

userSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

