import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      onLogin(res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={onSwitch}>Register</button></p>
    </>
  );
}

export default Login;