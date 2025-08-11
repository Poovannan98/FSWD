import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onSwitch, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      onLogin(response.data.token);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="glass-card">
      <h2 className="form-title">Welcome Back</h2>
      {error && <div style={{ color: '#ff6b6b', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="toggle-form">
        Don't have an account? <button type="button" onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Sign up</button>
      </div>
    </div>
  );
};

export default LoginForm;