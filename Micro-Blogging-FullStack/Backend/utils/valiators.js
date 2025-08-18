const { body } = require('express-validator');

exports.registerValidator = [
  body('username').isLength({ min: 3 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

exports.loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

exports.postValidator = [
  body('content').isLength({ min: 1, max: 280 }).trim()
];