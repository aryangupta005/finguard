import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFeatures(e.target.value.split(',').map(Number));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/predict', { features });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('There was an error making the request!', error);
    }
  };

  return (
    <div>
      <h1>ML Model Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Enter features separated by commas" />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;
