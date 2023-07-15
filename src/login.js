import React, { useEffect } from 'react';
import firebase from './firebase';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file for styling

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the page was redirected from the Google sign-in
    firebase.auth().getRedirectResult().then((result) => {
      if (result.user) {
        // User is signed in
        console.log(result.user);
        navigate('/main-page');
      }
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  }, []);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login Screen for Emergency Services</h1>
      <img
        className="login-image"
        src="https://cdn-icons-png.flaticon.com/512/5509/5509636.png"
        alt="Emergency Services"
      />
      <button className="login-button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
