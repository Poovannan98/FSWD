import React from 'react';
import { Heart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Post = ({ post, onLike }) => {
  const { user } = useAuth();
  const isLiked = post.likes?.includes(user?._id);

  const handleLike = async () => {
    try {
      await api.request(`/api/posts/${post._id}/like`, { method: 'POST' });
      onLike(post._id); // Update like state in parent
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      {/* Author Info */}
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">@{post.author?.username}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

      {/* Like Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isLiked
              ? 'text-red-500 bg-red-50'
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;