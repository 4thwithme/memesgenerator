import postsResolvers from "./posts.resolver";
import usersResolvers from "./users.resolver";

export default {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};
