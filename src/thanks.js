import React, { useEffect } from 'react';

const ThankYouContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: 'rgb(41, 80, 131)',
};

const Title = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '2rem',
  color: '#fff',
  textAlign: 'center',
};

const ThankYouPage = ({ selectedCarName, selectedCarPrice }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', 'pl_M5Rzyb9NQVQh54');
    script.async = true;

    const form = document.getElementById('payment-form');
    form.appendChild(script);

    return () => {
      form.removeChild(script);
    };
  }, []);

  return (
    <div style={ThankYouContainer}>
      <h1 style={Title}>Your Service will be at Destination soon. Please Pay to Avail Service. </h1>
      <form id="payment-form">
        {/* <div style={SelectedCar}>
          Selected Car: {selectedCarName} - Price: ${selectedCarPrice}
        </div> */}
        {/* Add more content or styling as needed */}
      </form>
    </div>
  );
};

export default ThankYouPage;
