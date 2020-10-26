import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloProvider,
} from '@apollo/client';

import client from './services/api';

import App from './App';

import 'antd/dist/antd.css';

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById('root')
);
