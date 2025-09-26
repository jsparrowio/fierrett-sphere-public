import React from 'react';
import './App.css';
import fhsicon from './fhsicon.png';

function App() {
  const handleButtonClick = () => {
    window.location.href = 'https://sso.fierrettsphere.com';
  };

  return (
    <div className="App">
      <div className="landing-container">
        <img src={fhsicon} style={{ 'height': '150px', 'width': '150px' }} alt="fierrettspherelogo"></img>
        <h1 className="title">The Fierrett Sphere</h1>
        <div className="message-container">
          <p className="message">
            Hi, you've reached the landing page for the Fierrett Sphere! This is a private site that requires access to the Fierrett Sphere network. If you are seeing this page, you were not detected on the Fierrett Sphere network. If you believe you have reached this page in error, contact the administrator or click the button below.
          </p>
          <button className="access-button" onClick={handleButtonClick}>
            Access Portal
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
