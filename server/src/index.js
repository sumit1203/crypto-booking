const path = require('path');
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    '.env'
  )
});
console.log('Starting server on ', process.env.NODE_ENV, 'env');

const { app } = require('./app');
const { SERVER_PORT } = require('./config');

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running at ${SERVER_PORT}!`);
});

module.exports = server;
