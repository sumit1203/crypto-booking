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
  confirmationEmailSentBooking,
  changesEmailSentBooking,
  sendBookingInfoByEmail } = require('../../src/controllers/Booking');
const { validBooking, validBookingWithEthPrice } = require('../utils/test-data');

after(() => {
  mongoose.connection.close();
});

describe('Booking controller', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
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
    const { booking, offerSignature } = await createBooking(validBooking);
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
  });

  it('Should throw an error on creating an invalid booking', async () => {
    // TODO the actual error must be roomType, payment is NaN because of roomtype is invalid
    // Mongoose is returning the 2 errors but we are triggering only the first one
    try {
      await createBooking(Object.assign({}, validBooking, { roomType: -1 }));
      throw Error('should not be called');
    } catch (e) {
      expect(e.code).to.be.equal('#invalidPaymentAmount');
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
    const dbBooking = BookingModel.generate(validBookingWithEthPrice);
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
    const dbBooking = BookingModel.generate(validBookingWithEthPrice);
    await dbBooking.save();
    const booking = await readBooking({ bookingHash: dbBooking.bookingHash });
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
    const dbBooking = BookingModel.generate(validBookingWithEthPrice);
    await dbBooking.save();
    const booking = await confirmationEmailSentBooking(dbBooking._id);
    expect(booking).to.have.property('confirmationEmailSent', true);
    expect(booking).to.have.property('changesEmailSent');
  });
  it('Should set changesEmailSent as true', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice);
    const { changesEmailSent } = await dbBooking.save();
    const booking = await changesEmailSentBooking(dbBooking._id);
    expect(booking).to.have.property('confirmationEmailSent', false);
    expect(booking.changesEmailSent).to.be.at.least(changesEmailSent);
  });
  it('Should send an email information', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice);
    await dbBooking.save();
    await sendBookingInfoByEmail(dbBooking.bookingHash);
  });
});
