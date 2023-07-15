import React, { useState } from 'react';
import axios from 'axios';
import './writesonic.css'; // Import CSS file for styling

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://chatgpt-api9.p.rapidapi.com/ask',
      params: {
        question: userInput
      },
      headers: {
        'X-RapidAPI-Key': '1b43b998e8mshecf18b614780362p1be75ejsne18f9cebbd57',
        'X-RapidAPI-Host': 'chatgpt-api9.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setResponse(response.data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="chatbot-input"
          placeholder="Ask a question..."
        />
        <button type="submit" className="chatbot-submit-button">
          Submit
        </button>
      </form>
      <div className="chatbot-response-container">
        <h2 className="chatbot-response-title">Response:</h2>
        <p className="chatbot-response">{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;
