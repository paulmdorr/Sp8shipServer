import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import resolvers from './graphql/resolvers/index';
import MainDataSource from './graphql/data-sources/main.dataSource';
import game from './game';

const { SERVER_PORT } = process.env;
const app = express();

// Load all GraphQL type definitions and merge them into a single schema
const typeDefs = mergeTypeDefs(loadFilesSync('src/graphql/schemas/*.gql'));

interface Context {
  dataSources: {
    mainDataSource: MainDataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const knexConfig = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'paul',
    password: '',
    database: 'sp8ship',
    schema: 'main',
  },
};

server.start().then(() => {
  game.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { cache } = server;

        return {
          dataSources: {
            mainDataSource: new MainDataSource({ knexConfig, cache }),
          },
        };
      },
    }),
  );

  app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/`);
    console.log(`🚀 GraphQL ready at http://localhost:${SERVER_PORT}/graphql`);
  });
});
