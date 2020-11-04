//home page
exports.home = async (req, res, next) => {
    try {
        
    res.json({ message: "You are on a home page, please sign in or sign up"});
          
    } catch(err) {
        next(err)
      }
    }