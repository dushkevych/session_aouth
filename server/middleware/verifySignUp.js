const User = require("../models/User")

const checkDuplicateEmail = async (req, res, next) => {
    try{         

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

module.exports = checkDuplicateEmail;