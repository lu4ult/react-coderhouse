import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import the functions you need from the SDKs you need
import { Auth0Provider } from '@auth0/auth0-react';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSPfrtn8pfH-FdzCLexVrg2AAKPu32Y4g",
  authDomain: "tienda-lu4ult.firebaseapp.com",
  projectId: "tienda-lu4ult",
  storageBucket: "tienda-lu4ult.appspot.com",
  messagingSenderId: "515506915724",
  appId: "1:515506915724:web:e0a37de73b27b639ce6ea9",
  measurementId: "G-W18GNS088D"
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
