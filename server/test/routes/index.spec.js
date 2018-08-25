/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const request = require('request-promise-native');
const { SERVER_PORT, BOOKING_POC_ADDRESS } = require('../../src/config');
const { version } = require('../../package.json');
const { validBooking } = require('../utils/test-data');
const { ethereunListenerCron, expiredBookingCron } = require('../../src/app');
const { disconnectDB, connectDB } = require('../../src/models');
const { startServer } = require('../../src/app');

describe('GET /', () => {
  let server;
  before(async () => {
    server = startServer(SERVER_PORT);
    ethereunListenerCron.destroy();
    expiredBookingCron.destroy();
    await connectDB();
  });
  after(async () => {
    await server.close();
    await disconnectDB();
  });
  it('Should return valid fields', async () => {
    const body = validBooking;
    const resp = await request({ url: `http://localhost:${SERVER_PORT}/`, method: 'GET', json: true, body });
    expect(resp).to.have.property('docs');
    expect(resp).to.have.property('info');
    expect(resp).to.have.property('info');
    expect(resp).to.have.property('version', version);
    expect(resp).to.have.property('bookingPoC', BOOKING_POC_ADDRESS);
    expect(resp).to.have.property('commit');
  });
});
