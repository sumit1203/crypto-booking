const express = require('express');
const bodyParser = require('body-parser');

const { validateIPWhiteList } = require('./middlewares/ip-white-list');
const { handleApplicationError } = require('./errors');
const { version } = require('../package.json');

const app = express();
app.use(bodyParser.json());
app.use('/*', validateIPWhiteList);

// Error handler
app.use((err, req, res, next) => {
  if (!err.code) {
    // Handle special cases of generic errors
    if (err.message === 'Invalid JSON RPC response: ""') {
      err = handleApplicationError('unreachableChain', err);
    } else {
      err = handleApplicationError('genericError', err);
    }
  }
  res.status(err.status).json({
    status: err.status,
    code: err.code,
    short: err.short,
    long: err.long,
  });
});

// Root handler
app.get('/', (req, res) => {
  const response = {
    docs: 'https://github.com/windingtree/wt-nodejs-api/blob/master/README.md',
    info: 'https://github.com/windingtree/wt-nodejs-api',
    version,
  };
  res.status(200).json(response);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    code: '#notFound',
    short: 'Page not found',
    long: 'This endpoint does not exist',
  });
});

module.exports = {
  app,
};
