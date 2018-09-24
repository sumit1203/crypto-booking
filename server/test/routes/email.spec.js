/* eslint-env mocha */
const path = require('path');
require('dotenv').config({ path: path.resolve('../.env.test') });
const { expect } = require('chai');
const mongoose = require('mongoose');
const request = require('request-promise-native');
const throttling = require('../../src/middlewares/throttling');
const sinon = require('sinon');
const sgMail = require('@sendgrid/mail');
const { validBookingWithEthPrice } = require('../utils/test-data');
const { SERVER_PORT } = require('../../src/config');
const { ethereunListenerCron, expiredBookingCron } = require('../../src/app');
const { disconnectDB } = require('../../src/models');
const { startServer } = require('../../src/app');

describe('POST /api/booking/emailInfo', () => {
  const apiUrl = `http://localhost:${SERVER_PORT}/api`;
  let sandbox;
  let BookingModel;
  let server;
  before(async () => {
    server = startServer(SERVER_PORT);
    ethereunListenerCron.destroy();
    expiredBookingCron.destroy();
    sandbox = sinon.createSandbox();
    BookingModel = mongoose.model('Booking');
    ethereunListenerCron.destroy();
    expiredBookingCron.destroy();
  });
  afterEach(async function () {
    await BookingModel.remove({}).exec();
    sandbox.restore();
    throttling.turnOnThrottling();
  });
  beforeEach(async function () {
    await BookingModel.resetIndex();
    throttling.turnOffThrottling();
    sandbox.stub(sgMail, 'send')
      .returns((data, cb) => ({ id: '<Some.id@server>', message: 'Queued. Thank you.' }));
  });
  after(async () => {
    await server.close();
    await disconnectDB();
  });
  it('Should read a booking', async () => {
    const dbBooking = await BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    const body = { bookingHash: dbBooking.bookingHash };
    const response = await request({ url: `${apiUrl}/booking/emailInfo`, method: 'POST', json: true, body });
    expect(response).to.have.property('status', 'ok');
  });
  it('Should propagate data errors', async () => {
    try {
      const body = { bookingHash: 'invalid booking' };
      await request({ url: `${apiUrl}/booking/emailInfo`, method: 'POST', json: true, body });
      throw new Error('should not be called');
    } catch (e) {
      expect(e).to.have.property('error');
      expect(e.error).to.have.property('code', '#sendBookingInfoFail');
    }
  });
  it('should respond with 429 when throttling limit is exceeded', async () => {
    throttling.turnOnThrottling();
    const dbBooking = await BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    const body = { bookingHash: dbBooking.bookingHash };
    let response = await request({ url: `${apiUrl}/booking/emailInfo`, method: 'POST', json: true, body });
    expect(response).to.have.property('status', 'ok');
    response = await request({ url: `${apiUrl}/booking/emailInfo`, method: 'POST', json: true, body });
    expect(response).to.have.property('status', 'ok');
    response = await request({ url: `${apiUrl}/booking/emailInfo`, method: 'POST', json: true, body });
    expect(response).to.have.property('status', 'ok');
    try {
      await request({ url: `${apiUrl}/booking/emailInfo`, method: 'POST', json: true, body });
      throw new Error('should not be called');
    } catch (e) {
      expect(e).to.have.property('error');
      expect(e.error).to.have.property('code', '#rateLimit');
    }
  });
});
