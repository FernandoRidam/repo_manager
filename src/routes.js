import React, {
  useReducer,
  useMemo,
  useEffect,
} from 'react';

import history from './utils/history';

import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';

import AuthContext from './utils/authContext';

import {
  Auth,
  Repos,
} from './pages';

import {
  Navbar,
} from './components';

export default function Routes() {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  }, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = localStorage.getItem('PRManager@Token');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    signIn: (token, username ) => {
      localStorage.setItem('PRManager@Login', username );
      localStorage.setItem('PRManager@Token', token );

      dispatch({ type: 'SIGN_IN', token });
    },

    signOut: () => {
      localStorage.removeItem('PRManager@Token');
      localStorage.removeItem('PRManager@Login');

      dispatch({ type: 'SIGN_OUT' });
    },
  }), []);

  return (
    <AuthContext.Provider value={authContext}>
      <div className="head">
        <Navbar />
      </div>

      <div className="content">
        <Router history={ history }>
          <Switch>
            <Route path="/" exact component={ Auth } />
            <Route path="/repos/:owner" exact component={ Repos } />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}
