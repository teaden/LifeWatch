import React from 'react';
import AddData from './AddData';

function App() {
  return (
    <div className="App">
      <div>
        <h1>LifeWatch</h1>
      </div>
      <div>
        <p>Please enter the forecasted data about your country</p>
      </div>
      <div className="form-container">
        <AddData />
      </div>
    </div>
  );
}

export default App;
