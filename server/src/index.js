const path = require('path');
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    (process.env.NODE_ENV === 'production') ? '.env' : '.env.development'),
});

const { startServer } = require('./app');
const { SERVER_PORT } = require('./config');

const server = startServer(SERVER_PORT);

module.exports = {
  server,
};
