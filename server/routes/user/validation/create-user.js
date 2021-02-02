const { check, validationResult } = require('express-validator');

exports.signUpValidationChain = [
    check('firstName')
      .not().isEmpty()
      .trim()
      .withMessage('First Name is required'),

    check('lastName')
      .not().isEmpty()
      .trim()
      .withMessage('Last Name is required'),

    check('email')
      .not().isEmpty()
      .isEmail()
      .normalizeEmail()
      .trim()
      .withMessage('valid e-mail is required'),
          
    check('password')
      .isLength({ min: 8 }).withMessage('password must be 8 characters')
      //password must be at least 8 characters long, contain uppercase letters, lowercase letters, numbers, can contain special characters
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
      .trim().escape()
      .withMessage('password must be at least 6 characters long, contain UPPERCASE LETTERS, lowercase letters, numbers, can contain special characters')
  ]

exports.validateSignUp = (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    next(); 
    
  } catch(err){
    next(err)
  }
};