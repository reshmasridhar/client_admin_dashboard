// src/components/Profile.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Profile.css';


function Profile() {
  const location = useLocation();
  const user = location.state?.user || {}; // Use default empty object if no user data is available

  return (
    <div>
      <h2>Profile Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Login Count:</strong> {user.loginCount}</p>
      <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</p>
    </div>
  );
}

export default Profile;
