import gql from "graphql-tag";

export default gql`
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type Query {
    sayHi: String!
    getPosts: [Post]
    getUsers: [User]
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!

    login(username: String!, password: String!): User!
  }
`;
