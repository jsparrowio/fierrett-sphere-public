import './App.css';
import fhsicon from './fhsicon.png';

function App() {



  return (
    <div className="App">
      <div className="landing-container">
        <img src={fhsicon} style={{ 'height': '150px', 'width': '150px' }} alt="fierrettspherelogo"></img>
        <h1 className="title">The Fierrett Sphere</h1>
        <div className="message-container">
          <h1>Welcome to the Fierrett Sphere!</h1>
          <p>Hey there! This is the landing page for the Fierrett Sphere, a private network provided by jsparrowio. No public access is allowed on this network.</p>
          <p>If you have been granted access to TFS, make sure you enter the URL of the app you are attempting to reach, and login using the login credentials you created.</p>
          <p>If you need further assistance, contact the administrator.</p>
          <h2>Thank you!</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
