import React, { useContext } from 'react';

import {
  FaSignOutAlt
} from "react-icons/fa";

import history from '../../utils/history';

import AuthContext from '../../utils/authContext';

import './styles.css';

export function Navbar() {
  const logged = true // localStorage.getItem('PRManager@Token');
  const username = 'Fernando' // localStorage.getItem('PRManager@Login');

  const {
    signOut,
  } = useContext(AuthContext);

  function handleLogout() {
    signOut();

    history.push('/');
  };


  return (
    <div className="navbar">
      <div/>

      <span className="title">Multi Repo PR Manager</span>

      {
        logged
          ? <button
              className="nav-button"
              onClick={ handleLogout }
            >
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
