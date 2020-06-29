import gql from "graphql-tag";

export default gql`
  type Query {
    getUsers: [User]
    getMemes(author: String!, limit: Int!, offset: Int!): [Mem]
    addToES: Boolean
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type PopulatedUser {
    id: ID!
    username: String!
  }

  type Mem {
    id: ID!
    file: String!
    name: String!
    memSrc: String!
    createdAt: String!
    author: PopulatedUser
    tags: [String]!
  }

  type AddNewMemResponce {
    file: String!
    name: String!
    externalUrl: String
    memSrc: String!
    createdAt: String!
    author: String
    tags: [String]!
  }

  type UploadFromUrlToAmazonResponce {
    url: String!
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
      externalUrl: String
      memSrc: String!
      createdAt: String!
      author: String
      tags: [String]!
    ): AddNewMemResponce!

    uploadFromUrlToAmazon(externalUrl: String!): UploadFromUrlToAmazonResponce!
  }
`;
