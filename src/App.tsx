import type { ReactNode } from 'react';
import './App.css';
import fhsicon from './fhsicon.png';

type PageContent = {
  heading: string;
  paragraphs: ReactNode[];
};

const pages: Record<string, PageContent> = {
  '/': {
    heading: 'Welcome to the Fierrett Sphere!',
    paragraphs: [
      'Hey there! This is the landing page for the Fierrett Sphere, a private network provided by jsparrowio. No public access is allowed on this network.',
      'If you have been granted access to TFS, make sure you enter the URL of the app you are attempting to reach, and login using the login credentials you created.',
      'If you need further assistance, contact the administrator.',
      <b>Thank you!</b>,
    ],
  },
  '/404': {
    heading: '404 - Page Not Found',
    paragraphs: [
      'The page you are looking for does not exist on the Fierrett Sphere.',
      'Please check the URL and try again.',
      'If this is a recurring error, please contact the site administrator.',
    ],
  },
  '/signups-closed': {
    heading: 'Sorry, signups are closed',
    paragraphs: [
      'New account registration is not available for the Fierrett Sphere at this time.',
      <b>If you were given a signup link by an administrator, there was an error with your link.</b>,
      'Please contact the admin who gave you your signup link for further assistance.',
      'Thanks!',
    ],
  },
};

function getPageContent() {
  const pathname = window.location.pathname;
  return pages[pathname] ?? pages['/404'];
}

function App() {
  const page = getPageContent();

  return (
    <div className="App">
      <div className="landing-container">
        <img className="sphere-icon" src={fhsicon} alt="Fierrett Sphere logo" />
        <h1 className="title">The Fierrett Sphere</h1>

        <div className="message-container">
          <h1>{page.heading}</h1>

          {page.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;