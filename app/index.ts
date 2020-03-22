import { ApolloServer } from 'apollo-server';
import * as mongoose from "mongoose";

import { MONGODB } from './config/mongodb';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

//initializing app
const normalizePort = (port: string): number => parseInt(port, 10);

const PORT = normalizePort(process.env.PORT || "9999");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB , { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
  })
  .then(() => server.listen({port: PORT}))
  .then((res) => {
    console.log(`Server was started at port ${res.url} ~~~~~~==ooo()==`);
  })
  .catch(console.error)
