import React, { useState } from 'react';
import api from '../utils/api';
import { Plus } from 'lucide-react';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      await api.request('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      setContent('');
      onPostCreated(); // Refresh timeline
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        maxLength="280"
      />
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-500">
          {280 - content.length} characters remaining
        </span>
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Posting...' : 'Post'}</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;