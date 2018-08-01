/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const mongoose = require('mongoose');
const request = require('request-promise-native');
const sinon = require('sinon');
const sgMail = require('@sendgrid/mail');
const { SERVER_PORT } = require('../../src/config');
const throttling = require('../../src/middlewares/throttling');
const { setCryptoIndex, getCryptoIndex } = require('../../src/services/crypto');
const { validBooking, validBookingWithEthPrice } = require('../utils/test-data');
const apiUrl = `http://localhost:${SERVER_PORT}/api`;
let server;
let BookingModel;
before(async () => {
  server = await require('../../src/index.js');
  BookingModel = mongoose.model('Booking');
});
after(async () => {
  const { ethereunListenerCron } = require('../../src/app');
  ethereunListenerCron.destroy();
  await server.close();
  await mongoose.connection.close();
});
describe('Booking API', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(async function () {
    await BookingModel.remove({}).exec();
    sandbox.restore();
    throttling.turnOnThrottling();
  });
  beforeEach(function () {
    setCryptoIndex(0);
    throttling.turnOffThrottling();
    sandbox.stub(sgMail, 'send')
      .returns((data, cb) => ({ id: '<Some.id@server>', message: 'Queued. Thank you.' }));
  });
  describe('POST /api/booking', () => {
    it('Should create a valid booking', async () => {
      const body = validBooking;
      const { booking } = await request({ url: `${apiUrl}/booking`, method: 'POST', json: true, body });
      expect(booking).to.have.property('_id');
      expect(booking).to.have.property('bookingHash');
      expect(booking).to.have.property('guestEthAddress', validBooking.guestEthAddress);
      expect(booking).to.have.property('paymentAmount');
      expect(booking).to.have.property('paymentType', validBooking.paymentType);
      expect(booking).to.have.property('signatureTimestamp');
      expect(booking.signatureTimestamp).to.have.a('number');
      expect(booking).to.have.property('personalInfo');
      expect(booking.personalInfo).to.have.property('fullName', validBooking.personalInfo.fullName);
      expect(booking.personalInfo).to.have.property('email', validBooking.personalInfo.email);
      expect(booking.personalInfo).to.have.property('birthDate', validBooking.personalInfo.birthDate);
      expect(booking.personalInfo).to.have.property('phone', validBooking.personalInfo.phone);
      const sendFake = sandbox.getFakes()[0];
      expect(sendFake).to.have.property('calledOnce', true);
    });
    it('Should propagate data errors', async () => {
      const body = Object.assign({}, validBooking, { roomType: -1 });

      try {
        await request({ url: `${apiUrl}/booking`, method: 'POST', json: true, body });
        throw new Error('should not be called');
      } catch (e) {
        expect(e).to.have.property('error');
        expect(e.error).to.have.property('code', '#invalidPaymentAmount');
      }
    });
  });

  describe('GET /api/booking/:bookingHash', () => {
    it('Should read a booking', async () => {
      const dbBooking = BookingModel.generate(validBookingWithEthPrice);
      await dbBooking.save();
      const index = 0;
      const booking = await request({ url: `${apiUrl}/booking/${dbBooking.bookingHash}?index=${index}`, method: 'GET', json: true });
      expect(booking).to.have.property('_id');
      expect(booking).to.have.property('bookingHash');
      expect(booking).to.have.property('guestEthAddress', validBooking.guestEthAddress);
      expect(booking).to.have.property('paymentAmount');
      expect(booking).to.have.property('paymentType', validBooking.paymentType);
      expect(booking).to.have.property('signatureTimestamp');
      expect(booking.signatureTimestamp).to.have.a('number');
      expect(booking).to.have.property('personalInfo');
      expect(booking.personalInfo).to.have.property('fullName', validBooking.personalInfo.fullName);
      expect(booking.personalInfo).to.have.property('email', validBooking.personalInfo.email);
      expect(booking.personalInfo).to.have.property('birthDate', validBooking.personalInfo.birthDate);
      expect(booking.personalInfo).to.have.property('phone', validBooking.personalInfo.phone);
    });
    it('Should propagate data errors', async () => {
      try {
        await request({ url: `${apiUrl}/booking/some-invalid-id`, method: 'GET', json: true });
        throw new Error('should not be called');
      } catch (e) {
        expect(e).to.have.property('error');
        expect(e.error).to.have.property('code', '#notFound');
      }
    });
  });

  describe('POST /api/booking/emailInfo', () => {
    it('Should read a booking', async () => {
      const dbBooking = BookingModel.generate(validBookingWithEthPrice);
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
      const dbBooking = BookingModel.generate(validBookingWithEthPrice);
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

  describe('DELETE /api/booking/:id', () => {
    it('Should delete a booking', async () => {
      const dbBooking = BookingModel.generate(validBookingWithEthPrice);
      await dbBooking.save();
      const booking = await request({ url: `${apiUrl}/booking/${dbBooking.id}`, method: 'DELETE', json: true });
      const dbReadBooking = await BookingModel.findById(booking.id).exec();
      expect(booking).to.have.property('_id', dbBooking.id);
      expect(dbReadBooking).to.be.an.equal(null);
    });
  });
});

describe('GET /', () => {
  it('Should return valid fields', async () => {
    const body = validBooking;
    const resp = await request({ url: `http://localhost:${SERVER_PORT}/`, method: 'GET', json: true, body });
    expect(resp).to.have.property('docs');
    expect(resp).to.have.property('info');
    expect(resp).to.have.property('info');
    expect(resp).to.have.property('version');
    expect(resp).to.have.property('bookingPoC');
    expect(resp).to.have.property('commit');
  });
});
