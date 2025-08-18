const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const {
  toggleFollow,
  getUserProfile,
  searchUsers
} = require('../Controllers/userController');

router.post('/:userId/follow', auth, toggleFollow);
router.get('/:userId', getUserProfile);
router.get('/search/:query', searchUsers);

module.exports = router;