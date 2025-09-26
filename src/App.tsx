import React from 'react';
import './App.css';
import fhsicon from './fhsicon.png';
import IpPinger from './Ping';

function App() {



  return (
    <div className="App">
      <div className="landing-container">
        <img src={fhsicon} style={{ 'height': '150px', 'width': '150px' }} alt="fierrettspherelogo"></img>
        <h1 className="title">The Fierrett Sphere</h1>
        <div className="message-container">
          <IpPinger
            ip="https://sso.fierrettsphere.com"
            redirectUrl="https://sso.fierrettsphere.com/"
            timeoutMs={2500}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
