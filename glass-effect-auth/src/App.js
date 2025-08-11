import React from 'react';
import AuthApp from './components/AuthApp';

import background from './assets/background.jpg'; // Replace with your image

function App() {
  return (
    <>
      <img src={background} alt="Background" className="background-image" />
      <div className="auth-container">
        <AuthApp />
      </div>
    </>
  );
}

export default App;