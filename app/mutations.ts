import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username_email: String!, $password: String!) {
    login(username_email: $username_email, password: $password) {
      result {
        id
        username
      }
      error
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      result {
        id
        username
      }
      error
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const LIKE_SONG = gql`
  mutation LikeSong($songID: ID!, $userID: ID!) {
    addLike(songID: $songID, userID: $userID) {
      result
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation RemoveLike($songID: ID!, $userID: ID!) {
    removeLike(songID: $songID, userID: $userID) {
      result
    }
  }
`;
