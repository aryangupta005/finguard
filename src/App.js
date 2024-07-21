import React, { useState } from 'react';

function App() {
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFeatures(e.target.value.split(',').map(Number));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });
      const data = await response.json();
      setPrediction(data.prediction);
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
