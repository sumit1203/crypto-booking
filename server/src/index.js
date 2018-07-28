require('dotenv').config();
const { app } = require('./app');
const { SERVER_PORT } = require('./config');

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running at ${SERVER_PORT}!`);
});

module.exports = server;
