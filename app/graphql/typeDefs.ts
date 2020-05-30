import gql from "graphql-tag";

export default gql`
  type Query {
    getUsers: [User]
    getMemes(authorId: String!, limit: Int!, offset: Int!): [Mem]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type Mem {
    id: ID!
    file: String!
    name: String!
    memSrc: String!
    createdAt: String!
    authorId: String!
    tags: [String]!
  }

  type IAddNewMemResponce {
    res: Boolean!
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

    addNewMem(
      file: Upload!
      name: String!
      internalUrl: String
      memSrc: String!
      createdAt: String!
      authorId: String!
      tags: [String]!
    ): IAddNewMemResponce!
  }
`;
