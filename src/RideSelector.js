import React, { useEffect, useState, useRef } from 'react';
import { carList } from './carList';
import './RideSelector.css';
import { useNavigate } from 'react-router-dom';

const RideSelector = ({ distance, onConfirm }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const selectedCarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Selected Car:', selectedCar);
    scrollToBottom();
  }, [selectedCar]);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const calculatePrice = (distance, selectedCar) => {
    if (!selectedCar) {
      return 0; // Or any default value you prefer when no car is selected
    }

    const pricePerKilometer = selectedCar.service === 'ICU Ambulance' ? 20 : 10;
    return distance * pricePerKilometer;
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleConfirm = () => {
    const price = calculatePrice(distance, selectedCar);
    if (price > 0) {
      navigate("/thanks");
    }
  };

  return (
    <div className="ride-selector">
      <h1 className="ride-selector-title">Choose a ride, or swipe up for more</h1>
      <div className="car-list">
        {carList.map((car, index) => (
          <div className="car-item" key={index} onClick={() => handleCarSelect(car)}>
            <img className="car-image" src={car.imgUrl} alt="Car" />
            <div className="car-service">
              <p>{car.service}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="selected-car" ref={selectedCarRef}>
          <h1 className="selected-car-title">Selected Car:</h1>
          <div className="selected-car-details">
            <h2>Service: {selectedCar.service}</h2>
            <h2>Price: ₹{calculatePrice(distance, selectedCar)}</h2>
          </div>
        </div>
      )}

      <button className="scroll-button" onClick={scrollToBottom}>
        Scroll Down
      </button>

      {selectedCar && (
        <button className="confirm-button" onClick={handleConfirm} disabled={calculatePrice(distance, selectedCar) === 0}>
          Confirm Emergency Service
        </button>
      )}
    </div>
  );
};

export default RideSelector;
