/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
require('../../src/models');
const mongoose = require('mongoose');
const BookingModel = mongoose.model('Booking');
const {
  createBooking,
  readBooking,
  confirmationEmailSentBooking,
  changesEmailSentBooking } = require('../../src/controllers/Booking');
const { validBooking, validBookingWithEthPrice } = require('../utils/test-data');

after(() => {
  mongoose.connection.close();
});

describe('Booking controller', () => {
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
    expect(booking).to.have.property('lastChange');
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
    expect(booking).to.have.property('personalInfo');
    expect(booking.personalInfo).to.have.property('name', validBookingWithEthPrice.personalInfo.name);
    expect(booking.personalInfo).to.have.property('email', validBookingWithEthPrice.personalInfo.email);
    expect(booking.personalInfo).to.have.property('birthday', validBookingWithEthPrice.personalInfo.birthday);
    expect(booking.personalInfo).to.have.property('phone', validBookingWithEthPrice.personalInfo.phone);
    expect(booking).to.have.property('roomType', validBookingWithEthPrice.roomType);
    expect(booking).to.have.property('to', validBookingWithEthPrice.to);
    expect(booking).to.have.property('from', validBookingWithEthPrice.from);
    expect(booking).to.have.property('confirmationEmailSent', false);
    expect(booking).to.have.property('lastChange');
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
    expect(booking.personalInfo).to.have.property('name', validBookingWithEthPrice.personalInfo.name);
    expect(booking.personalInfo).to.have.property('email', validBookingWithEthPrice.personalInfo.email);
    expect(booking.personalInfo).to.have.property('birthday', validBookingWithEthPrice.personalInfo.birthday);
    expect(booking.personalInfo).to.have.property('phone', validBookingWithEthPrice.personalInfo.phone);
    expect(booking).to.have.property('roomType', validBookingWithEthPrice.roomType);
    expect(booking).to.have.property('to', validBookingWithEthPrice.to);
    expect(booking).to.have.property('from', validBookingWithEthPrice.from);
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
    expect(booking).to.have.property('lastChange');
  });
  it('Should set changesEmailSent as true', async () => {
    const dbBooking = BookingModel.generate(validBookingWithEthPrice);
    const { lastChange } = await dbBooking.save();
    const booking = await changesEmailSentBooking(dbBooking._id);
    expect(booking).to.have.property('confirmationEmailSent', false);
    expect(booking.lastChange).to.be.at.least(lastChange);
  });
});
