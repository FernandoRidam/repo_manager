import React from 'react';

import Routes from './routes';

import './styles.css';

function App() {
  return (
    <>
      <div className="head">
        <div className="navbar"></div>
      </div>

      <div className="content">
        <Routes />
      </div>
    </>
  );
}

export default App;
