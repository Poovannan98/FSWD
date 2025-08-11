import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    console.log('Logged in with token:', token);
    setIsAuthenticated(true);
  };

  const handleSignup = (userData) => {
    console.log('Registered:', userData);
    setIsLogin(true);
  };

  if (isAuthenticated) {
    return (
      <div className="glass-card">
        <h2 className="form-title">Welcome!</h2>
        <p style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
          You are successfully authenticated.
        </p>
        <button className="btn" onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>
    );
  }

  return isLogin ? (
    <LoginForm onSwitch={() => setIsLogin(false)} onLogin={handleLogin} />
  ) : (
    <SignupForm onSwitch={() => setIsLogin(true)} onSignup={handleSignup} />
  );
};

export default AuthApp;