const config = require("../config/auth.config");
const User = require("../models/User")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = new User({
    email,
    password: bcrypt.hashSync(password, 8)
  });
  
  // посмотри мои изменения, подумай почему я так написал
  await user.save();

  res.send({ message: "User was registered successfully!", user });
  } catch(e) {
    return next(e);
  }
};


exports.signin = async (req, res, next) => {
  try {
  const { password } = req.body;

  const user = await User.findOne({
    username: req.body.username
  }).exec();

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }   

  const passwordIsValid = bcrypt.compareSync( password, user?.password);

  if (!passwordIsValid) {
     return res.status(401).send({
      success: false,
      // accessToken: null,
      message: 'Invalid password!'
     });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, config.secret, { expiresIn: 86400 });

  // подписываем токен, для доступа в аппу, нет смысла отдавать еще userId и email в response
  res.status(200).json({ accessToken: token});
  }catch(e) {
    return next(e);
   }
};

exports.dashboard = (req, res) => {
  res.status(200).send("Dashboard Content.");
};