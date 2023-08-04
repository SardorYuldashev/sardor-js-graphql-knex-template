import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './schema.js';
import { expressMiddleware } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';
import config from '../shared/config/index.js';

export function buildGraphQLServer(httpServer) {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/gql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Http serverda xatolik bo'lsa serverni to'xtatish uchun plugin
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // Ws serverda xatolik bo'lsa serverni to'xtatish uchun sozlama
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const serverMiddleware = () => expressMiddleware(server, {
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        const decoded = jwt.verify(token, config.jwt.secret);

        return { user: decoded.user };
      }

      return { user: {} };
    },
  });

  return { server, serverMiddleware };
};