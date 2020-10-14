const checkDuplicateEmail = require("../middleware/verifySignUp");
const verifyToken = require("../middleware/authJwt")
const controller = require("../controllers/auth.controller");

const User = require("../models/User")

const bcrypt = require("bcryptjs");

const { Router } =  require('express');
const router = Router();

// @todo тут по сути в пути "auth" не нужен
router.get("/api/auth/dashboard", verifyToken, controller.dashboard);

module.exports = router;