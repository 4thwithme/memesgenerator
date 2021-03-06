import gql from "graphql-tag";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const ADD_NEW_MEM = gql`
  mutation addNewMem(
    $file: Upload!
    $name: String!
    $externalUrl: String
    $memSrc: String!
    $createdAt: String!
    $author: String
    $tags: [String]!
  ) {
    addNewMem(
      file: $file
      name: $name
      externalUrl: $externalUrl
      memSrc: $memSrc
      createdAt: $createdAt
      author: $author
      tags: $tags
    ) {
      file
    }
  }
`;

const FETCH_MEMES_BY_AUTHOR_ID = gql`
  query getMemes($author: String!, $limit: Int!, $offset: Int!) {
    getMemes(author: $author, limit: $limit, offset: $offset) {
      id
      name
      tags
      createdAt
      author {
        id
        username
      }
      file
      memSrc
    }
  }
`;

const SEARCH_MEMES = gql`
  query searchMemes($query: String!, $limit: Int!, $offset: Int!) {
    searchMemes(query: $query, limit: $limit, offset: $offset) {
      id
      name
      tags
      createdAt
      author {
        id
        username
      }
      file
      memSrc
    }
  }
`;

const UPLOAD_FROM_EXTERNAL_URL_TO_AMAZON = gql`
  mutation uploadFromUrlToAmazon($externalUrl: String!) {
    uploadFromUrlToAmazon(externalUrl: $externalUrl) {
      url
    }
  }
`;

export default {
  REGISTER_USER,
  LOGIN_USER,
  ADD_NEW_MEM,
  FETCH_MEMES_BY_AUTHOR_ID,
  UPLOAD_FROM_EXTERNAL_URL_TO_AMAZON,
  SEARCH_MEMES
};
