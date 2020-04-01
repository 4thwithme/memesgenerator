import usersResolvers from "./users.resolver";

export default {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};
