const { connectDB } = require('./models');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const morgan = require('morgan');

const { BOOKING_POC_ADDRESS, GIT_REV, WEB3_PROVIDER, logger } = require('./config');
const { validateIPWhiteList } = require('./middlewares/ip-white-list');
const { handleApplicationError } = require('./errors');
const { version } = require('../package.json');
const routes = require('./routes');
const { checkBookingExpired } = require('./services/booking');
const { checkEtherumUpdates } = require('./services/ethereum-listener');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/*', validateIPWhiteList);

// Root handler
app.get('/', (req, res) => {
  const response = {
    docs: 'https://github.com/windingtree/crypto-booking-app#readme',
    info: 'https://github.com/windingtree/crypto-booking-app#',
    version,
    bookingPoC: BOOKING_POC_ADDRESS,
    commit: GIT_REV,
    provider: WEB3_PROVIDER,
  };
  res.status(200).json(response);
});

app.use(morgan(':remote-addr :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms', {
  stream: {
    write: (msg) => logger.info(msg),
  },
}));

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

const ethereunListenerCron = cron.schedule('* * * * *', checkEtherumUpdates);
const expiredBookingCron = cron.schedule('*/5 * * * *', checkBookingExpired);

const startServer = (port) => {
  connectDB();
  return app.listen(port, () => {
    console.log(`Server running at ${port}!`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  });
};

module.exports = {
  app,
  ethereunListenerCron,
  expiredBookingCron,
  startServer,
};
