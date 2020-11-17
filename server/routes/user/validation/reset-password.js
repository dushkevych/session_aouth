const { check, validationResult, /*body, param, query, isEmail, isLength,  withMessage*/ } = require('express-validator');

exports.recoverEmail = [

    check('email')
      .not().isEmpty()
      .isEmail()
      .normalizeEmail()
      .trim()
      .withMessage('valid e-mail is required')

    ]

exports.resetPassword = [
      
    check('password')
      .not().isEmpty()
      .isLength({ min: 8 }).withMessage('password must be 8 characters')
      //password must be at least 8 characters long, contain uppercase letters, lowercase letters, numbers, can contain special characters
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .trim().escape()
      .withMessage('password must be at least 8 characters long, contain uppercase letters, lowercase letters, numbers, can contain special characters'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
      .withMessage('Passwords do not match')
    
    ]
    
exports.validate = (req, res, next) => {
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