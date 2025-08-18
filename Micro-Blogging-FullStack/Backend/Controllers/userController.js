const User = require('../Models/User');

exports.toggleFollow = async (req, res) => {
  try {
    if (req.params.userId === req.userId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.userId);

    if (!userToFollow) return res.status(404).json({ message: 'User not found' });

    const isFollowing = currentUser.following.includes(req.params.userId);

    if (isFollowing) {
      currentUser.following.pull(req.params.userId);
      userToFollow.followers.pull(req.userId);
    } else {
      currentUser.following.push(req.params.userId);
      userToFollow.followers.push(req.userId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ 
      isFollowing: !isFollowing,
      followersCount: userToFollow.followers.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      ...user.toObject(),
      followersCount: user.followers.length,
      followingCount: user.following.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.params.query, $options: 'i' }
    }).select('-password').limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};