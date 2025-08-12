import React, { useState } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import TodoList from './Components/TodoList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState(token ? 'todos' : 'login');

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setView('todos');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setView('login');
  };

  return (
    <div className="container">
      {view === 'login' && <Login onLogin={handleLogin} onSwitch={() => setView('register')} />}
      {view === 'register' && <Register onSwitch={() => setView('login')} />}
      {view === 'todos' && <TodoList token={token} onLogout={handleLogout} />}
    </div>
  );
}

export default App;