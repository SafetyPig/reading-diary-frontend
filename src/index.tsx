import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ReadingDiary from './readingDiary';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './authContext';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ydcxmmfaiie0fgyg.us.auth0.com"
      clientId="BPWuMQ7UNrisLwN0XSjO7fDrmnXEfzYc"
      authorizationParams={{
        redirect_uri: "http://localhost:3000"
      }}
    >
      <AuthProvider>
        <ReadingDiary />
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
