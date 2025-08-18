const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const { registerValidator, loginValidator } = require('../utils/valiators');
const { register, login, getCurrentUser } = require('../Controllers/authController');

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/me', auth, getCurrentUser);

module.exports = router;