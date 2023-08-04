import http from 'http';
import express from 'express';
import cors from 'cors';
import { buildGraphQLServer } from './graphql/index.js';
import config from './shared/config/index.js';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const { server, serverMiddleware } = buildGraphQLServer(httpServer);
await server.start();
app.use('/gql', serverMiddleware());

const PORT = config.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/gql`);
});