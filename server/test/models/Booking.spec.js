/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const { Booking } = require('../../src/models/Booking');
const { BOOKING_PAYMENT_TYPES, BOOKING_ROOM_TYPES, BOOKING_STATUS } = require('../../src/constants');
const { validBookingDB, validBookingWithEthPrice } = require('../utils/test-data');
const { decrypt } = require('../../src/services/crypto');
const { web3 } = require('../../src/services/web3');

function basicValidationExpect (validation, field) {
  expect(validation).to.have.property('errors');
  expect(validation.errors).to.have.property(field);
}

describe('Booking model', () => {
  describe('bookingHash', () => {
    it('Should throw an error if bookingHash is not defined', () => {
      const booking = Booking.generate(validBookingWithEthPrice);
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
        booking.bookingHash = 'someHash';
        booking.encryptPersonalInfo(validBookingWithEthPrice.personalInfo, booking.bookingHash);
        const decryptPersonalInfo = booking.decryptPersonalInfo(booking.bookingHash);
        expect(decryptPersonalInfo).to.be.deep.equal(validBookingWithEthPrice.personalInfo);
      });
      it('Should return an empty object on invalid bookingHash', () => {
        const booking = new Booking(validBookingDB);
        booking.bookingHash = 'someHash';
        booking.encryptPersonalInfo(validBookingWithEthPrice.personalInfo, booking.bookingHash);
        const decryptPersonalInfo = booking.decryptPersonalInfo('fakeBookinHash');
        expect(decryptPersonalInfo).to.be.deep.equal({});
      });
    });
    xdescribe('generateBookingHash', () => {});
    xdescribe('generatePaymentAmount', () => {});
    xdescribe('getWeiPerNight', () => {});
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
        const booking = new Booking(validBookingDB);
        await booking.setAsCanceled();
        expect(booking).to.have.property('status', BOOKING_STATUS.canceled);
      });
    });
    describe('setAsApproved', async () => {
      it('Should set the booking as approved', async () => {
        const booking = new Booking(validBookingDB);
        await booking.setAsApproved();
        expect(booking).to.have.property('status', BOOKING_STATUS.approved);
      });
    });
    describe('generate', () => {
      it('Should generate no error using validBooking data', async () => {
        const booking = Booking.generate(validBookingWithEthPrice);
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
  });
});
