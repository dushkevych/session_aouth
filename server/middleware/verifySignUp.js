const User = require("../models/User")

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    try{
        const user = await User.findOne({
            username: req.body.username
          });
        user.exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
        
            if (user) {
              res.status(400).send({ message: "Failed! Username is already in use!" });
              return;
            };
        });
        

    // Email
    const email = await User.findOne({
      email: req.body.email
    });
    email.exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  
  } catch (err) {
    console.log('DB CONNECTION ERROR');
    throw err;
  };
}; 

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;