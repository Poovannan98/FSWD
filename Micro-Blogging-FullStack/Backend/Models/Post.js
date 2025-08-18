const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true, maxLength: 280 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);