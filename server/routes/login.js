const checkDuplicateEmail = require("../middleware/verifySignUp");
const verifyToken = require("../middleware/authJwt")
const controller = require("../controllers/auth.controller");

const User = require("../models/User")

const bcrypt = require("bcryptjs");

const { Router } =  require('express');
const router = Router();

router.post("/api/auth/signup", (req, res) => {
    const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  
  console.log('USER:', user)
  
  user.save();

  res.send({ message: "User was registered successfully!" });

});

router.post("/api/auth/signin", controller.signin);

router.get("/api/auth/dashboard", verifyToken, controller.dashboard);

module.exports = router;