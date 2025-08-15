import React, { useState } from 'react';
import axios from 'axios';

function Register({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      alert('Registered successfully');
      onSwitch();
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </>
  );
}

export default Register;