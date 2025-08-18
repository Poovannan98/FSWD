import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-3">Your Profile</h3>
      <div className="space-y-2">
        <p><span className="font-medium">Username:</span> @{user.username}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Following:</span> {user.following?.length || 0}</p>
        <p><span className="font-medium">Followers:</span> {user.followers?.length || 0}</p>
      </div>
    </div>
  );
};

export default ProfileCard;