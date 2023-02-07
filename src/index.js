import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import the functions you need from the SDKs you need
import { Auth0Provider } from '@auth0/auth0-react';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGUCRIiz7_z5EozAJp50XfboUk0hC4x1w",
  authDomain: "react-coderhouse-ac264.firebaseapp.com",
  projectId: "react-coderhouse-ac264",
  storageBucket: "react-coderhouse-ac264.appspot.com",
  messagingSenderId: "617942978561",
  appId: "1:617942978561:web:7b098047a1d9d4aa463000"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-eevpki3wx8j8g2s5.us.auth0.com"
    clientId="bOeQpmbWOhtLLXXF2IfOon4xl2rfi8MI"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/user`
    }}
  >
    <App />
  </Auth0Provider>
);
