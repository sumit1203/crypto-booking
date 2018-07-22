/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
require('../../src/models');
const mongoose = require('mongoose');

const BookingModel = mongoose.model('Booking');
const { Booking } = require('../../src/controllers/Booking');
const { utils } = require('web3');

const validBooking = {
  publicKey: 'some public key',
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  personalInfo: {
    name: 'Some name',
    email: 'email@email.com',
    birthday: '17/12/1987',
    phone: '+11111111111',
  },
};

const validBookingDB = {
  publicKey: 'some public key',
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  payment: {
    amount: 0.1,
    type: 'eth',
    tx: 'some tx',
  },
  personalInfo: '0x7b226e616d65223a22536f6d65206e616d65222c22656d61696c223a22656d61696c40656d61696c2e636f6d222c226269727468646179223a2231372f31322f31393837222c2270686f6e65223a222b3131313131313131313131227d',
};

describe('Booking controller', () => {
  after(() => {
    mongoose.connection.close();
  });
  it('Should create a valid booking', async () => {
    validBooking.guestEthAddress = `0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e${Date.now()}`;
    const booking = await Booking.create(validBooking);
    expect(booking).to.be.an.instanceof(Booking);
    expect(booking).to.have.property('id');
    expect(booking).to.have.property('publicKey', validBooking.publicKey);
    expect(booking).to.have.property('guestEthAddress', validBooking.guestEthAddress);
    expect(booking).to.have.property('paymentAmount', validBooking.paymentAmount);
    expect(booking).to.have.property('paymentType', validBooking.paymentType);
    expect(booking).to.have.property('signatureTimestamp');
    expect(booking.signatureTimestamp).to.have.a('number');
    expect(booking).to.have.property('personalInfo');
    expect(booking.personalInfo).to.have.property('name', validBooking.personalInfo.name);
    expect(booking.personalInfo).to.have.property('email', validBooking.personalInfo.email);
    expect(booking.personalInfo).to.have.property('birthday', validBooking.personalInfo.birthday);
    expect(booking.personalInfo).to.have.property('phone', validBooking.personalInfo.phone);
    await BookingModel.remove({ _id: booking.id }).exec();
  });

  it('Should throw an error on creating an invalid booking', async () => {
    validBooking.guestEthAddress = `0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e${Date.now()}`;
    try {
      await Booking.create(Object.assign({}, validBooking, { paymentAmount: 'asdasd' }));
      throw Error('should not be called');
    } catch (e) {
      expect(e.code).to.be.equal('#invalidPaymentAmount');
    }
  });

  it('Should store the personalInfo encoded', async () => {
    validBooking.guestEthAddress = `0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e${Date.now()}`;
    const booking = await Booking.create(validBooking);
    const dbBooking = await BookingModel.findById(booking.id).exec();
    expect(dbBooking).to.be.an('object');
    expect(utils.isHex(dbBooking.personalInfo)).to.be.equal(true);
    await BookingModel.remove({ _id: booking.id }).exec();
  });
  it('Should read a booking', async () => {
    validBooking.guestEthAddress = validBookingDB.guestEthAddress = `0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e${Date.now()}`;
    const dbBooking = new BookingModel(validBookingDB);
    await dbBooking.save();
    const booking = await Booking.read({ id: dbBooking._id });
    expect(booking).to.be.an.instanceof(Booking);
    expect(booking).to.have.property('id');
    expect(booking).to.have.property('publicKey', validBooking.publicKey);
    expect(booking).to.have.property('guestEthAddress', validBooking.guestEthAddress);
    expect(booking).to.have.property('paymentAmount', validBooking.paymentAmount);
    expect(booking).to.have.property('paymentType', validBooking.paymentType);
    expect(booking).to.have.property('signatureTimestamp');
    expect(booking.signatureTimestamp).to.have.a('number');
    expect(booking).to.have.property('personalInfo');
    expect(booking.personalInfo).to.have.property('name', validBooking.personalInfo.name);
    expect(booking.personalInfo).to.have.property('email', validBooking.personalInfo.email);
    expect(booking.personalInfo).to.have.property('birthday', validBooking.personalInfo.birthday);
    expect(booking.personalInfo).to.have.property('phone', validBooking.personalInfo.phone);
    await BookingModel.remove({ _id: booking.id }).exec();
  });

  it('Should return null if the id not exists', async () => {
    const booking = await Booking.read({ id: 'fake id' });
    expect(booking).to.be.equal(null);
  });

  it('Should update a booking', async () => {
    validBooking.guestEthAddress = validBookingDB.guestEthAddress = `0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e${Date.now()}`;
    const dbBooking = new BookingModel(validBookingDB);
    await dbBooking.save();
    const booking = await Booking.read({ id: dbBooking._id });
    const newPersonalInfo = { email: 'new@email.com' };
    booking.personalInfo = newPersonalInfo;
    await booking.save();
    const booking2 = await Booking.read({ id: dbBooking._id });
    expect(booking2).to.be.an.instanceof(Booking);
    expect(booking2).to.have.property('personalInfo');
    expect(booking2.personalInfo).to.have.property('email', newPersonalInfo.email);
    await BookingModel.remove({ _id: booking.id }).exec();
  });

  it('Should delete a booking', async () => {
    validBooking.guestEthAddress = validBookingDB.guestEthAddress = `0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e${Date.now()}`;
    const dbBooking = new BookingModel(validBookingDB);
    await dbBooking.save();
    const booking = await Booking.read({ id: dbBooking._id });
    await booking.delete();
    const dbReadBooking = await BookingModel.findById(booking.id).exec();
    expect(dbReadBooking).to.be.an.equal(null);
  });
});
