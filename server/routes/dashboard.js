const checkDuplicateEmail = require("../middleware/verifySignUp");
const verifyToken = require("../middleware/authJwt")
const controller = require("../controllers/auth.controller");

const User = require("../models/User")

const bcrypt = require("bcryptjs");

const { Router } =  require('express');
const router = Router();

//@route   POST /api/dashboard
//@desc    Access private data after signin or signup
//@access  Private

// @todo тут по сути в пути "auth" не нужен
router.get("/api/dashboard", verifyToken, controller.dashboard);

module.exports = router;

