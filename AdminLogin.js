// src/components/AdminLogin.js
import React, { useState } from 'react';
import './AdminLogin.css';


import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the credentials match admin credentials
      if (email === 'admin@email.com' && password === 'Admin@123') {
        navigate('/admin');
      } else {
        alert('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Error logging in as admin', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
