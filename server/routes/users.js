const { Router } =  require('express');
const router = Router();

const auth = require('../middleware/auth')
const controller = require("../controllers/users-controller");

//@route   GET api/users
//@desc    Get all users
//@access  Private

router.get('/users', auth, controller.users );

module.exports = router;