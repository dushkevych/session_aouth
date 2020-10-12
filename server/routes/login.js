const checkDuplicateEmail = require("../middleware/verifySignUp");
const verifyToken = require("../middleware/authJwt")
const controller = require("../controllers/auth.controller");

const { Router } =  require('express');
const router = Router();

router.post( "/api/auth/signup", checkDuplicateEmail, controller.signup);

router.post("/api/auth/signin", controller.signin);

router.get("/api/auth/dashboard", verifyToken, controller.dashboard);

module.exports = router;