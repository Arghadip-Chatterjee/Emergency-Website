import { useEffect, useState } from 'react';
import Map from './Map';
import RideSelector from './RideSelector';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookNow.css'; // Import the CSS file for BookNow component

const BookNow = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState();
  const [dropoffCoordinates, setDropoffCoordinates] = useState();

  return (
    <div className="book-now-container">
      <Map pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
    </div>
  );
};

export default BookNow;
