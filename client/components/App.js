import React from 'react';
import Nav from './Nav';
import Content from './Content';
import Data from './Data';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="main">
        <Content />
        <Data />
      </div>
    </div >
  );
}

export default App;
