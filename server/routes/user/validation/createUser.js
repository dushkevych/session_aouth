const { check, body, param, query, isEmail, isLength,  validationResult, withMessage } = require('express-validator');

exports.signUpValidationChain = [
    check('email').isEmail().withMessage('e-mail is required'),
    
    check('password').isLength({ min: 6 }).withMessage('password must be 6 characters')
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