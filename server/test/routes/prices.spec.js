/* eslint-env mocha */
const path = require('path');
require('dotenv').config({ path: path.resolve('../.env.test') });
const { expect } = require('chai');
const request = require('request-promise-native');
const { SERVER_PORT } = require('../../src/config');
const { ethereunListenerCron, expiredBookingCron } = require('../../src/app');
const { disconnectDB } = require('../../src/models');
const { startServer } = require('../../src/app');
const { BOOKING_ROOM_TYPES, BOOKING_PAYMENT_TYPES } = require('../../src/constants');

describe('GET /prices/:roomType', () => {
  const apiUrl = `http://localhost:${SERVER_PORT}/api`;
  let server;
  before(async () => {
    server = startServer(SERVER_PORT);
    ethereunListenerCron.destroy();
    expiredBookingCron.destroy();
  });
  after(async () => {
    await server.close();
    await disconnectDB();
  });
  it('Should return one valid price', async () => {
    const resp = await request({ url: `${apiUrl}/prices/${BOOKING_ROOM_TYPES[0]}/?paymentTypes[]=${BOOKING_PAYMENT_TYPES.eth}`, method: 'GET', json: true });
    expect(resp).to.be.instanceof(Array);
    expect(resp).to.have.lengthOf(1);
    expect(resp[0]).to.have.property('paymentType', BOOKING_PAYMENT_TYPES.eth);
    expect(resp[0]).to.have.property('price');
  });
  it('Should return multi valid prices', async () => {
    const resp = await request({ url: `${apiUrl}/prices/${BOOKING_ROOM_TYPES[0]}/?paymentTypes[]=${BOOKING_PAYMENT_TYPES.eth}&paymentTypes[]=${BOOKING_PAYMENT_TYPES.lif}`, method: 'GET', json: true });
    expect(resp).to.be.instanceof(Array);
    expect(resp).to.have.lengthOf(2);
    expect(resp[0]).to.have.property('paymentType', BOOKING_PAYMENT_TYPES.eth);
    expect(resp[0]).to.have.property('price');
    expect(resp[1]).to.have.property('paymentType', BOOKING_PAYMENT_TYPES.lif);
    expect(resp[1]).to.have.property('price');
  });
  it('Should return an error if one of the paymentType is invalid', async () => {
    try {
      await request({ url: `${apiUrl}/prices/${BOOKING_ROOM_TYPES[0]}/?paymentTypes[]=${BOOKING_PAYMENT_TYPES.eth}&paymentTypes[]=invalid`, method: 'GET', json: true });
    } catch (e) {
      expect(e).to.have.property('error');
      expect(e.error).to.have.property('code', '#invalidPaymentType');
    }
  });
  it('Should return an error if paymentTypes is not an array', async () => {
    try {
      await request({ url: `${apiUrl}/prices/${BOOKING_ROOM_TYPES[0]}/?paymentTypes=${BOOKING_PAYMENT_TYPES.eth}`, method: 'GET', json: true });
    } catch (e) {
      expect(e).to.have.property('error');
      expect(e.error).to.have.property('code', '#noPaymentTypes');
    }
  });
  it('Should return an error if roomType not exists', async () => {
    try {
      await request({ url: `${apiUrl}/prices/someRoomType/?paymentTypes[]=${BOOKING_PAYMENT_TYPES.eth}`, method: 'GET', json: true });
    } catch (e) {
      expect(e).to.have.property('error');
      expect(e.error).to.have.property('code', '#invalidRoomType');
    }
  });
});
