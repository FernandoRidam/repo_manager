import React from 'react';

import {
  useQuery,
} from '@apollo/client';

import {
  GET_REPO,
} from '../../services/repo';

export function Repos() {
  const { loading, error, data } = useQuery( GET_REPO, { variables: {
    login: localStorage.getItem('PRManager@Login'),
  }});

  return (
    <div></div>
  );
};
