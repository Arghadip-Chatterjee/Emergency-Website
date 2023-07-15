import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from './firebase';
import MapComponent from './Map2';
import './MainPage.css'; // Import CSS file for styling

const MainPage = () => {
  const navigate = useNavigate();

  const book = () => {
    navigate('/book-now');
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Handle successful sign-out
        navigate('/');
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="main-page">
      <div className="map-container">
        <MapComponent />
      </div>
      <div className="button-container">
        <button className="book-button" onClick={book}>
          Book Now
        </button>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default MainPage;
