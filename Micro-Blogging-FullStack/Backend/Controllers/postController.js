const Post = require('../Models/Post');
const User = require('../Models/User');
const { validationResult } = require('express-validator');

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const post = new Post({
      content: req.body.content,
      author: req.userId
    });

    await post.save();
    await post.populate('author', 'username');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const following = [...currentUser.following, req.userId];

    const posts = await Post.find({ author: { $in: following } })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const likeIndex = post.likes.indexOf(req.userId);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    await post.populate('author', 'username');

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};