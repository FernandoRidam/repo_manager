import React from 'react';

import Routes from './routes';

import {
  Navbar,
} from './components';

import './styles.css';

function App() {
  return (
    <>
      <div className="head">
        <Navbar />
      </div>

      <div className="content">
        <Routes />
      </div>
    </>
  );
}

export default App;
