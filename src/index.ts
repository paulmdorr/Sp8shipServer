import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import resolvers from './graphql/resolvers/index';
import world from './game/world';

const { SERVER_PORT } = process.env;
const app = express();

// Load all GraphQL type definitions and merge them into a single schema
const typeDefs = mergeTypeDefs(loadFilesSync('src/graphql/schemas/*.gql'));

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  world.update();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
  );

  app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/`);
    console.log(`🚀 GraphQL ready at http://localhost:${SERVER_PORT}/graphql`);
  });
});
