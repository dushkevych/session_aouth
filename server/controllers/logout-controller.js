exports.logout = async (req, res, next) => {
    try {
        req.session.destroy();   
        res.clearCookie('sessionId');
        res.redirect('/api/home');
          
      } catch(err) {
          if(err) {
              return res.redirect('/user').json({success: false, message: 'Session is still active'});
            }
            next(err);
          };
      }