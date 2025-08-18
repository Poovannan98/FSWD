import React, { useState, useEffect } from 'react';
import { Search, User, UserPlus, UserMinus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const searchUsers = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await api.request(`/api/users/search/${searchQuery}`);
      setResults(data.filter(u => u._id !== user._id));
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await api.request(`/api/users/${userId}/follow`, { method: 'POST' });
      setResults(results.map(u =>
        u._id === userId
          ? { ...u, isFollowing: !u.isFollowing }
          : u
      ));
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchUsers(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">Find People</h3>

      <div className="relative mb-4">
        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}

      <div className="space-y-3">
        {results.map(userResult => (
          <div key={userResult._id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium">@{userResult.username}</p>
                {userResult.bio && (
                  <p className="text-sm text-gray-500">{userResult.bio}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => handleFollow(userResult._id)}
              className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
                userResult.isFollowing
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {userResult.isFollowing ? (
                <>
                  <UserMinus className="w-4 h-4" />
                  <span>Unfollow</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Follow</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;