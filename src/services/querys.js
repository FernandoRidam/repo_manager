import { gql } from '@apollo/client';

export const GET_REPO = gql`
  query getRepo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name){
      pullRequests(
        first: 100,
        orderBy: { field: CREATED_AT, direction: DESC },
      ) {
          nodes {
            title,
            author {
              login,
            },
            state,
            url,
          }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($login: String!) {
    user(login: $login) {
      login,
    }
  }
`;
