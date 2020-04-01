import gql from "graphql-tag";

export default gql`
  type Query {
    getUsers: [User]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
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
