/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const sgMail = require('@sendgrid/mail');
const sinon = require('sinon');
require('../../src/models');
const mongoose = require('mongoose');
const BookingModel = mongoose.model('Booking');
const {
  createBooking,
  readBooking,
  confirmBooking,
  changesEmailSentBooking,
  sendBookingInfoByEmail,
  checkBookingExpired,
  getBookingIndex,
} = require('../../src/controllers/Booking');
const { validBooking, validBookingWithEthPrice } = require('../utils/test-data');
const { setCryptoIndex } = require('../../src/services/crypto');
const { BOOKING_STATUS, SIGNATURE_TIME_LIMIT } = require('../../src/constants');

after(() => {
  mongoose.connection.close();
});

describe('Booking controller', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    setCryptoIndex(0);
    sandbox.stub(sgMail, 'send')
      .returns((data, cb) => ({ id: '<Some.id@server>', message: 'Queued. Thank you.' }));
  });
  afterEach(() => {
    sandbox.restore();
  });
  afterEach(async function () {
    await BookingModel.remove({}).exec();
  });

  it('Should create a valid booking', async function () {
    const { booking, offerSignature, bookingIndex, privateKey } = await createBooking(validBooking);
    expect(booking).to.have.property('bookingHash');
    expect(booking.bookingHash).to.be.a('string');
    expect(booking).to.have.property('guestEthAddress', validBooking.guestEthAddress);
    expect(booking.guestEthAddress).to.be.a('string');
    expect(booking).to.have.property('paymentAmount');
    expect(booking.paymentAmount).to.be.a('number');
    expect(booking).to.have.property('paymentType', validBooking.paymentType);
    expect(booking.paymentType).to.be.a('string');
    expect(booking).to.have.property('signatureTimestamp');
    expect(booking.signatureTimestamp).to.be.a('number');
    expect(booking).to.have.property('personalInfo');
    expect(booking.personalInfo).to.be.a('object');
    expect(booking).to.have.property('roomType');
    expect(booking.roomType).to.be.a('string');
    expect(booking).to.have.property('confirmationEmailSent', false);
    expect(booking).to.have.property('changesEmailSent');
    expect(booking).to.have.property('guestCount', validBooking.guestCount);
    expect(offerSignature).to.not.be.an('undefined');
    expect(bookingIndex).to.be.an('number');
    expect(privateKey).to.be.an('string');
  });

  it('Should create a new booking with a diffent public key if already exists', async function () {
    const { booking: booking1 } = await createBooking(validBooking);
    setCryptoIndex(0);
    const { booking: booking2 } = await createBooking(validBooking);
    expect(booking1.bookingHash).to.be.not.equal(booking2.bookingHash);
  });

  it('Should throw an error on creating an invalid booking', async () => {
    try {
      await createBooking(Object.assign({}, validBooking, { roomType: -1 }));
      throw Error('should not be called');
    } catch (e) {
      expect(e.code).to.be.equal('#invalidRoomType');
    }
  });

  it('Should throw with invalid guestEthAddress', async () => {
    try {
      await createBooking(Object.assign({}, validBooking, { guestEthAddress: '0x8765445678' }));
      throw Error('should not be called');
    } catch (e) {
      expect(e.code).to.be.equal('#guestEthAddressChecksum');
    }
  });

  it('Should throw an error on creating an invalid booking', async () => {
    try {
      await createBooking(Object.assign({}, validBooking, { to: 0 }));
      throw Error('should not be called');
    } catch (e) {
      expect(e.code).to.be.equal('#toOutOfRange');
    }
  });

  it('Should read a booking using id', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    const booking = await readBooking({ id: dbBooking._id });
    expect(booking).to.have.property('_id');
    expect(booking).to.have.property('bookingHash');
    expect(booking.bookingHash).to.be.a('string');
    expect(booking).to.have.property('guestEthAddress', validBookingWithEthPrice.guestEthAddress);
    expect(booking).to.have.property('paymentAmount');
    expect(booking).to.have.property('paymentType', validBookingWithEthPrice.paymentType);
    expect(booking).to.have.property('signatureTimestamp');
    expect(booking.signatureTimestamp).to.have.a('number');
    expect(booking.personalInfo).to.be.deep.equal({});
    expect(booking).to.have.property('roomType', validBookingWithEthPrice.roomType);
    expect(booking).to.have.property('to', validBookingWithEthPrice.to);
    expect(booking).to.have.property('from', validBookingWithEthPrice.from);
    expect(booking).to.have.property('confirmationEmailSent', false);
    expect(booking).to.have.property('changesEmailSent');
    expect(booking).to.have.property('guestCount', validBookingWithEthPrice.guestCount);
  });

  it('Should read a booking using bookingHash', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    const booking = await readBooking({ bookingHash: dbBooking.bookingHash }, 0);
    expect(booking).to.have.property('_id');
    expect(booking).to.have.property('bookingHash');
    expect(booking.bookingHash).to.be.a('string');
    expect(booking).to.have.property('guestEthAddress', validBookingWithEthPrice.guestEthAddress);
    expect(booking).to.have.property('paymentAmount');
    expect(booking).to.have.property('paymentType', validBookingWithEthPrice.paymentType);
    expect(booking).to.have.property('signatureTimestamp');
    expect(booking.signatureTimestamp).to.have.a('number');
    expect(booking).to.have.property('personalInfo');
    expect(booking.personalInfo).to.have.property('fullName', validBookingWithEthPrice.personalInfo.fullName);
    expect(booking.personalInfo).to.have.property('email', validBookingWithEthPrice.personalInfo.email);
    expect(booking.personalInfo).to.have.property('birthDate', validBookingWithEthPrice.personalInfo.birthDate);
    expect(booking.personalInfo).to.have.property('phone', validBookingWithEthPrice.personalInfo.phone);
    expect(booking).to.have.property('roomType', validBookingWithEthPrice.roomType);
    expect(booking).to.have.property('to', validBookingWithEthPrice.to);
    expect(booking).to.have.property('from', validBookingWithEthPrice.from);
    expect(booking).to.have.property('guestCount', validBookingWithEthPrice.guestCount);
  });

  it('Should return null if the id not exists', async () => {
    const booking = await readBooking({ id: 'fake id' });
    expect(booking).to.be.equal(null);
  });
  it('Should set confirmationEmailSent as true', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    const booking = await confirmBooking(dbBooking._id);
    expect(booking).to.have.property('confirmationEmailSent', true);
    expect(booking).to.have.property('status', BOOKING_STATUS.approved);
    expect(booking).to.have.property('changesEmailSent');
  });
  it('Should set changesEmailSent as true', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    const { changesEmailSent } = await dbBooking.save();
    const booking = await changesEmailSentBooking(dbBooking._id);
    expect(booking).to.have.property('confirmationEmailSent', false);
    expect(booking.changesEmailSent).to.be.at.least(changesEmailSent);
  });
  it('Should send an email information', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    await sendBookingInfoByEmail(dbBooking.bookingHash);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });
  it('Should set a booking as pending', async () => {
    const dbBooking = BookingModel.generate({
      ...validBookingWithEthPrice,
      signatureTimestamp: Math.floor(Date.now() / 1000 - (SIGNATURE_TIME_LIMIT + 15) * 60),
    }, validBookingWithEthPrice.privateKey);
    await dbBooking.save();
    const bookingsExpred = await checkBookingExpired();
    const updatedBooking = await readBooking({ id: await bookingsExpred[0] });
    expect(updatedBooking).to.have.property('status', BOOKING_STATUS.canceled);
  });
  it('Should get the booking index', async () => {
    await createBooking(validBooking);
    const { booking } = await createBooking(validBooking);
    await createBooking(validBooking);
    expect(await getBookingIndex(booking._id.toString())).to.be.equal(1);
  });
});
