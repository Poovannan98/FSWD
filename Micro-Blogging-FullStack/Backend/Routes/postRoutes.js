const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const { postValidator } = require('../utils/valiators');
const {
  createPost,
  getTimelinePosts,
  getUserPosts,
  toggleLike
} = require('../Controllers/postController');

router.post('/', auth, postValidator, createPost);
router.get('/timeline', auth, getTimelinePosts);
router.get('/user/:userId', getUserPosts);
router.post('/:postId/like', auth, toggleLike);

module.exports = router;