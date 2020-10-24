import React from 'react';

import {
  FaArrowLeft,
  FaSignOutAlt
} from "react-icons/fa";

import './styles.css';

export function Navbar() {
  const logged = localStorage.getItem('PRManager@Token');

  return (
    <div className="navbar">
      <button className="nav-button">
        <FaArrowLeft
          color="#FFF"
          size="100%"
        />
      </button>

      <span className="title">Multi Repo PR Manager</span>

      {
        logged
          ? <button className="nav-button">
              <FaSignOutAlt
                color="#FFF"
                size="100%"
              />
            </button>
          : <div />
      }
    </div>
  );
};
