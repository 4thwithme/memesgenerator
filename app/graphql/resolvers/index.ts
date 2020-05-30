import usersResolvers from "./users.resolver";
import memsResolvers from "./mems.resolvers";

export default {
  Query: {
    ...usersResolvers.Query,
    ...memsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...memsResolvers.Mutations
  }
};
