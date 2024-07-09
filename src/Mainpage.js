import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './Map2';
import './MainPage.css'; // Import CSS file for styling
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const MainPage = () => {
  const navigate = useNavigate();

  const book = () => {
    navigate('/book-now');
  };

  const handleSignOut = () => {
    navigate('/sign-in');

  };

  return (
    <div className="main-page">
      <div className="map-container">
        <MapComponent />
      </div>
      <div className="button-container">
        <SignedIn>
          <button className="book-button" onClick={book}>
            Book Now
          </button>
        </SignedIn>

        <SignedOut>
          <button className="sign-out-button" onClick={handleSignOut}>SignIn</button>
        </SignedOut>

      </div>
    </div>
  );
};

export default MainPage;
