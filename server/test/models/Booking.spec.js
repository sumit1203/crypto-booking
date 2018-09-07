/* eslint-env mocha */
require('dotenv').config({ path: '../../../.env.test' });
const mongoose = require('mongoose');
const { expect } = require('chai');
const { connectDB, disconnectDB } = require('../../src/models');
const { Booking } = require('../../src/models/Booking');
const { BOOKING_PAYMENT_TYPES, BOOKING_ROOM_TYPES, BOOKING_STATUS, SIGNATURE_TIME_LIMIT } = require('../../src/constants');
const { validBookingDB, validBookingWithEthPrice, testPrivateKey } = require('../utils/test-data');
const { decrypt } = require('../../src/services/crypto');
const { web3 } = require('../../src/services/web3');
const sinon = require('sinon');

function basicValidationExpect (validation, field) {
  expect(validation).to.have.property('errors');
  expect(validation.errors).to.have.property(field);
}

describe('Booking model', () => {
  let BookingModel;
  before(async () => {
    connectDB();
    BookingModel = mongoose.model('Booking');
  });
  after(async () => {
    disconnectDB();
  });
  afterEach(async () => {
    await BookingModel.remove({}).exec();
  });
  describe('bookingHash', () => {
    it('Should throw an error if bookingHash is not defined', async () => {
      const booking = await Booking.generate(validBookingWithEthPrice);
      booking.bookingHash = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'bookingHash');
      expect(validation.errors.bookingHash).to.have.property('message', 'noBookingHash');
    });
  });

  describe('guestEthAddress', () => {
    it('Should throw an error if guestEthAddress is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.guestEthAddress = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'guestEthAddress');
      expect(validation.errors.guestEthAddress).to.have.property('message', 'noGuestEthAddress');
    });
    it('Should throw an error if guestEthAddress is not checksum', () => {
      const booking = new Booking({ ...validBookingDB, guestEthAddress: '0x98789' });
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'guestEthAddress');
      expect(validation.errors.guestEthAddress).to.have.property('message', 'guestEthAddressChecksum');
    });
  });

  describe('payment amount', () => {
    it('Should throw an error if paymentAmount is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.paymentAmount = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'paymentAmount');
      expect(validation.errors.paymentAmount).to.have.property('message', 'noPaymentAmount');
    });

    it('Should throw an error if payment.amount equal or less than 0', () => {
      const booking = new Booking(validBookingDB);
      booking.paymentAmount = 0;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'paymentAmount');
      expect(validation.errors.paymentAmount).to.have.property('message', 'minAmount');
    });
  });

  describe('payment type', () => {
    const allowedPaymentTypes = Object.keys(BOOKING_PAYMENT_TYPES);
    const allowedPaymentTypesString = allowedPaymentTypes.join(', ').toLowerCase();

    it(`Should allow to set paymentType as ${allowedPaymentTypesString}`, () => {
      for (const types of allowedPaymentTypes) {
        const booking = new Booking(validBookingDB);
        booking.paymentType = types;
        const validation = booking.validateSync();
        expect(validation).to.be.a('undefined');
        expect(booking.paymentType).to.be.equal(types);
      }
    });

    it(`Should throw an error if paymentType is not ${allowedPaymentTypes}`, () => {
      const booking = new Booking(validBookingDB);
      booking.paymentType = 'some invalid type';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'paymentType');
      expect(validation.errors.paymentType).to.have.property('kind', 'enum');
    });

    it('Should throw an error if paymentType is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.paymentType = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'paymentType');
      expect(validation.errors.paymentType).to.have.property('message', 'noPaymentType');
    });
  });

  describe('payment tx', () => {
    it('Should have the property paymentTx with type string', () => {
      const booking = new Booking(validBookingDB);
      const newPaymentTx = 'some new payment tx';
      booking.paymentTx = newPaymentTx;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.paymentTx).to.be.equal(newPaymentTx);
    });
  });

  describe('encryptedPersonalInfo', () => {
    it('Should throw an error if encryptedPersonalInfo is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.encryptedPersonalInfo = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'encryptedPersonalInfo');
      expect(validation.errors.encryptedPersonalInfo).to.have.property('message', 'noEncryptedPersonalInfo');
    });
  });

  describe('roomType', () => {
    const allowedRoomTypesString = BOOKING_ROOM_TYPES.join(', ').toLowerCase();
    it(`Should allow to set roomType as ${allowedRoomTypesString}`, () => {
      BOOKING_ROOM_TYPES.forEach((type) => {
        const booking = new Booking(validBookingDB);
        booking.roomType = type;
        const validation = booking.validateSync();
        expect(validation).to.be.a('undefined');
        expect(booking.roomType).to.be.equal(type);
      });
    });
    it(`Should throw an error if roomType is not ${allowedRoomTypesString}`, () => {
      const booking = new Booking(validBookingDB);
      booking.roomType = 'some other room';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'roomType');
      expect(validation.errors.roomType).to.have.property('kind', 'enum');
    });

    it('Should throw an error if roomType is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.roomType = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'roomType');
      expect(validation.errors.roomType).to.have.property('message', 'noRoomType');
    });
  });

  describe('from', () => {
    it('Should throw an error if from has a number greater than 4', () => {
      const booking = new Booking(validBookingDB);
      booking.from = 5;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'from');
      expect(validation.errors.from).to.have.property('message', 'fromOutOfRange');
    });

    it('Should throw an error if from has a number less than 1', () => {
      const booking = new Booking(validBookingDB);
      booking.from = 0;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'from');
      expect(validation.errors.from).to.have.property('message', 'fromOutOfRange');
    });

    it('Should throw an error if from is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.from = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'from');
      expect(validation.errors.from).to.have.property('message', 'noFrom');
    });
  });
  describe('to', () => {
    it('Should throw an error if "to" has a number greater than 4', () => {
      const booking = new Booking(validBookingDB);
      booking.to = 5;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'to');
      expect(validation.errors.to).to.have.property('message', 'toOutOfRange');
    });

    it('Should throw an error if "to" has a number less than the to prop', () => {
      const booking = new Booking(validBookingDB);
      booking.to = 1;
      booking.from = 2;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'to');
      expect(validation.errors.to).to.have.property('message', 'toOutOfRange');
    });

    it('Should throw an error if "to" is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.to = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'to');
      expect(validation.errors.to).to.have.property('message', 'noTo');
    });
  });
  describe('status', () => {
    const allowedStatus = Object.keys(BOOKING_STATUS);
    const allowedStatusString = allowedStatus.join(', ').toLowerCase();
    it(`Should allow to set status as ${allowedStatusString}`, async () => {
      const booking = new Booking(validBookingDB);
      for (const status of allowedStatus) {
        booking.status = status;
        const validation = booking.validateSync();
        expect(validation).to.be.a('undefined');
        expect(booking.status).to.be.equal(status);
      }
    });

    it(`Should throw an error if status is not ${allowedStatusString}`, () => {
      const booking = new Booking(validBookingDB);
      booking.status = 'some other status';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'status');
      expect(validation.errors.status).to.have.property('kind', 'enum');
    });

    it('Should throw an error if status is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.status = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'status');
      expect(validation.errors.status).to.have.property('message', 'noStatus');
    });
  });
  describe('guestCount', () => {
    it('Should allow to set guestCount', async () => {
      const booking = new Booking(validBookingDB);
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.guestCount).to.be.equal(validBookingDB.guestCount);
    });
    it('Should throw with invalid guestCount', async () => {
      const booking = new Booking({ ...validBookingDB, guestCount: 3 });
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'guestCount');
      expect(validation.errors.guestCount).to.have.property('message', 'guestCountOutOfRange');
    });
    it('Should throw with invalid guestCount', async () => {
      const booking = new Booking({ ...validBookingDB, guestCount: 0 });
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'guestCount');
      expect(validation.errors.guestCount).to.have.property('message', 'guestCountOutOfRange');
    });
  });
  describe('methods', () => {
    describe('encryptPersonalInfo', () => {
      it('Should encode to hex and encrypt personal info', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        booking.encryptPersonalInfo(validBookingWithEthPrice.personalInfo, booking.bookingHash);
        expect(booking).to.have.property('encryptedPersonalInfo');
        const encodedPersonalInfo = decrypt(booking.encryptedPersonalInfo, booking.bookingHash);
        expect(web3.utils.isHex(encodedPersonalInfo)).to.be.equal(true);
        const decryptPersonalInfo = JSON.parse(web3.utils.hexToString(encodedPersonalInfo));
        expect(decryptPersonalInfo).to.be.deep.equal(validBookingWithEthPrice.personalInfo);
      });
      it('Should throw and error if personalInfo is not an object', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        const invalidPersonalInfo = 'somePersonalInfo';
        try {
          booking.encryptPersonalInfo(invalidPersonalInfo, booking.bookingHash);
        } catch (e) {
          expect(e.code).to.be.equal('#invalidPersonalInfo');
        }
      });
      it('Should throw and error if an invalid email is given', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        const invalidPersonalInfo = { ...validBookingWithEthPrice.personalInfo, email: 'invalidEmail' };
        try {
          booking.encryptPersonalInfo(invalidPersonalInfo, booking.bookingHash);
        } catch (e) {
          expect(e.code).to.be.equal('#invalidPersonalInfoEmail');
        }
      });
      it('Should throw and error if an invalid fullName is given', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        const invalidPersonalInfo = { ...validBookingWithEthPrice.personalInfo, fullName: 'invalidFullName' };
        try {
          booking.encryptPersonalInfo(invalidPersonalInfo, booking.bookingHash);
        } catch (e) {
          expect(e.code).to.be.equal('#invalidPersonalInfoFullName');
        }
      });
      it('Should throw and error if an invalid phone is given', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        const invalidPersonalInfo = { ...validBookingWithEthPrice.personalInfo, phone: '1234' };
        try {
          booking.encryptPersonalInfo(invalidPersonalInfo, booking.bookingHash);
        } catch (e) {
          expect(e.code).to.be.equal('#invalidPersonalInfoPhone');
        }
      });
      it('Should throw and error if an invalid birthDate is given', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        const invalidPersonalInfo = { ...validBookingWithEthPrice.personalInfo, birthDate: '17/12/1987' };
        try {
          booking.encryptPersonalInfo(invalidPersonalInfo, booking.bookingHash);
        } catch (e) {
          expect(e.code).to.be.equal('#invalidPersonalInfoBirthDate');
        }
      });
    });
    describe('decryptPersonalInfo', () => {
      it('Should decode personal info', () => {
        const booking = new Booking(validBookingDB);
        booking.encryptPersonalInfo(validBookingWithEthPrice.personalInfo, testPrivateKey);
        const decryptPersonalInfo = booking.decryptPersonalInfo(testPrivateKey);
        expect(decryptPersonalInfo).to.be.deep.equal(validBookingWithEthPrice.personalInfo);
      });
      it('Should return an empty object on invalid bookingHash', () => {
        const booking = new Booking(validBookingDB);
        booking.encryptPersonalInfo(validBookingWithEthPrice.personalInfo, testPrivateKey);
        const decryptPersonalInfo = booking.decryptPersonalInfo('fakeBookinHash');
        expect(decryptPersonalInfo).to.be.deep.equal({});
      });
    });
    xdescribe('generatePaymentAmount', () => {});
    describe('getWeiPerNight', async () => {
      it('Should throw and error if cryptoPrice is not a number', async () => {
        const booking = new Booking(validBookingDB);
        try {
          await booking.getWeiPerNight('Not a number');
          throw Error('should not be called');
        } catch (e) {
          expect(e.code).to.be.equal('#invalidCryptoPrice');
        }
      });
      it('Should throw and error if roomType is not valid', async () => {
        const booking = new Booking(validBookingDB);
        try {
          booking.roomType = 'invalidRoomType';
          await booking.getWeiPerNight(1);
          throw Error('should not be called');
        } catch (e) {
          expect(e.code).to.be.equal('#invalidRoomType');
        }
      });
      it('Should return room\'s price in wei per night', async () => {
        const booking = new Booking(validBookingDB);
        const cryptoPrice = 0.541;
        expect(await booking.getWeiPerNight(cryptoPrice)).to.be.a('string');
      });
      it('Should return room\'s price in wei per night with lif token', async () => {
        const booking = new Booking(validBookingDB);
        booking.paymentType = BOOKING_PAYMENT_TYPES.lif;
        const cryptoPrice = 0.541;
        expect(await booking.getWeiPerNight(cryptoPrice)).to.be.a('string');
      });
    });
    describe('setAsPending', () => {
      it('Should set the booking as pending', async () => {
        const booking = new Booking(validBookingDB);
        booking.status = BOOKING_STATUS.approved;
        await booking.save();
        await booking.setAsPending();
        expect(booking).to.have.property('status', BOOKING_STATUS.pending);
      });
    });
    describe('setAsCanceled', async () => {
      it('Should set the booking as canceled', async () => {
        const booking = new Booking({ ...validBookingDB, ...{ bookingHash: `${validBookingDB.bookingHash}${Date.now()}` } });
        await booking.setAsCanceled();
        expect(booking).to.have.property('status', BOOKING_STATUS.canceled);
      });
    });
    describe('setAsApproved', async () => {
      it('Should set the booking as approved', async () => {
        const booking = new Booking({ ...validBookingDB, ...{ bookingHash: `${validBookingDB.bookingHash}${Date.now()}` } });
        await booking.setAsApproved();
        expect(booking).to.have.property('status', BOOKING_STATUS.approved);
      });
    });
    describe('generate', () => {
      it('Should generate no error using validBooking data', async () => {
        const booking = await Booking.generate(validBookingWithEthPrice);
        const validation = await booking.validateSync();
        expect(validation).to.be.a('undefined');
        expect(booking).to.have.property('bookingHash');
        expect(booking.bookingHash).to.be.a('string');
        expect(booking).to.have.property('guestEthAddress', validBookingWithEthPrice.guestEthAddress);
        expect(booking.guestEthAddress).to.be.a('string');
        expect(booking).to.have.property('paymentAmount');
        expect(booking.paymentAmount).to.be.a('number');
        expect(booking).to.have.property('paymentType', validBookingWithEthPrice.paymentType);
        expect(booking.paymentType).to.be.a('string');
        expect(booking).to.have.property('paymentTx', validBookingWithEthPrice.paymentTx);
        expect(booking.paymentTx).to.be.a('string');
        expect(booking).to.have.property('signatureTimestamp');
        expect(booking.signatureTimestamp).to.be.a('number');
        expect(booking).to.have.property('encryptedPersonalInfo');
        expect(booking.encryptedPersonalInfo).to.be.a('string');
        expect(booking).to.have.property('roomType');
        expect(booking.roomType).to.be.a('string');
        expect(booking).to.have.property('status', BOOKING_STATUS.pending);
      });
    });
    describe('resetIndex', () => {
      it('Should return a promise', () => {
        expect(Booking.resetIndex()).to.be.an.instanceof(Promise);
      });
      it('Should call function resetCount of the plugin autoIncrement', async () => {
        sinon.spy(Booking, 'resetCount');
        await Booking.resetIndex();
        expect(Booking.resetCount).to.have.property('calledOnce', true);
        Booking.resetCount.restore();
      });
    });
    describe('nextIndex', () => {
      it('Should return a promise', () => {
        expect(Booking.nextIndex()).to.be.an.instanceof(Promise);
      });
      it('Should call function nextCount of the plugin autoIncrement', async () => {
        sinon.spy(Booking, 'nextCount');
        await Booking.nextIndex();
        expect(Booking.nextCount).to.have.property('calledOnce', true);
        Booking.nextCount.restore();
      });
    });
    describe('getFromDate', () => {
      it('Should return an string 6/9/2018', () => {
        const booking = new Booking(validBookingDB);
        expect(booking.getFromDate()).to.be.equal(validBookingDB.from);
      });
    });
    describe('getFromDate', () => {
      it('Should return an string 10/9/2018', () => {
        const booking = new Booking(validBookingDB);
        expect(booking.getToDate()).to.be.equal(validBookingDB.to);
      });
    });
    describe('getRemainingMinutes', () => {
      it('Should return 30 minutes', () => {
        const booking = new Booking(validBookingDB);
        expect(booking.getRemainingMinutes()).to.be.equal(SIGNATURE_TIME_LIMIT);
      });
      it(`Should return ${SIGNATURE_TIME_LIMIT - 1} minutes`, () => {
        const booking = new Booking(validBookingDB);
        booking.signatureTimestamp = booking.signatureTimestamp - 60;
        expect(booking.getRemainingMinutes()).to.be.equal(SIGNATURE_TIME_LIMIT - 1);
      });
    });
  });
});
