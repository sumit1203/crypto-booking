const express = require('express');
const bodyParser = require('body-parser');

const { validateIPWhiteList } = require('./middlewares/ip-white-list');
const { handleApplicationError } = require('./errors');
const { version } = require('../package.json');
require('./models');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/*', validateIPWhiteList);

// Root handler
app.get('/', (req, res) => {
  const response = {
    docs: 'https://github.com/windingtree/crypto-booking-app#readme',
    info: 'https://github.com/windingtree/crypto-booking-app#',
    version,
  };
  res.status(200).json(response);
});

// API routes
app.use('/api', routes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    code: '#notFound',
    short: 'Page not found',
    long: 'This endpoint does not exist',
  });
});

// Error handler
app.use((err, req, res, next) => {
  if (!err.code) {
    err = handleApplicationError('genericError', err);
  }
  res.status(err.status).json({
    status: err.status,
    code: err.code,
    short: err.short,
    long: err.long,
  });
});

module.exports = {
  app,
};
