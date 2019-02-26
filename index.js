const express = require('express');
const helmet = require('helmet');
// const knex = require ('knex');

const zoosRouter = require('./data/zoosRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/zoos', zoosRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h1>Welcome to DB-Zoos!</h1>
  `);
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
