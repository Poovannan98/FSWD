import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import UserSearch from './components/UserSearch';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import api from './utils/api';

const MicroBlogApp = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await api.request('/api/posts/timeline');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => fetchPosts();

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        const isLiked = post.likes?.includes(user._id);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter(id => id !== user._id)
            : [...(post.likes || []), user._id]
        };
      }
      return post;
    }));
  };

  if (!user) return <AuthForm />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header username={user.username} onLogout={logout} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="lg:col-span-2">
            <CreatePost onPostCreated={handlePostCreated} />
            {loading ? (
              <p className="text-center text-gray-500 py-8">Loading posts...</p>
            ) : posts.length === 0 ? (
              <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500 mb-4">No posts yet!</p>
                <p className="text-sm text-gray-400">Start following people or create your first post.</p>
              </div>
            ) : (
              posts.map(post => (
                <Post key={post._id} post={post} onLike={handleLike} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UserSearch />
            <ProfileCard user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MicroBlogApp />
  </AuthProvider>
);

export default App;