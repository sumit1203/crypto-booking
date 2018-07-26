/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const { Booking } = require('../../src/models/Booking');
const { BOOKING_STATUS } = require('../../src/constants');
const { validBookingDB, validBookingWithEthPrice } = require('../utils/test-data');

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
    it('Should allow to set paymentType as "lif" or "eth"', () => {
      const booking = new Booking(validBookingDB);
      booking.paymentType = 'lif';
      let validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.paymentType).to.be.equal('lif');
      booking.paymentType = 'eth';
      validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.paymentType).to.be.equal('eth');
    });

    it('Should throw an error if paymentType is not "eth" or "lif"', () => {
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
    it('Should allow to set roomType as "double" and "twin"', () => {
      const booking = new Booking(validBookingDB);
      booking.roomType = 'double';
      let validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.roomType).to.be.equal('double');
      booking.roomType = 'twin';
      validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.roomType).to.be.equal('twin');
    });

    it('Should throw an error if roomType is not "double" or "twin"', () => {
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
  describe('methods', () => {
    xdescribe('encryptPersonalInfo', () => {});
    xdescribe('decryptPersonalInfo', () => {});
    xdescribe('generateBookingHash', () => {});
    xdescribe('generatePaymentAmount', () => {});
    xdescribe('getWeiPerNight', () => {});
    describe('setAsPending', () => {
      it('Should set the booking as pending', async () => {
        const booking = new Booking(validBookingDB);
        booking.status = BOOKING_STATUS.approve;
        await booking.save();
        await booking.setAsPending();
        expect(booking).to.have.property('status', BOOKING_STATUS.pending);
      });
    });
    describe('setAsCancel', async () => {
      it('Should set the booking as cancel', async () => {
        const booking = new Booking(validBookingDB);
        await booking.setAsCancel();
        expect(booking).to.have.property('status', BOOKING_STATUS.cancel);
      });
    });
    describe('setAsApprove', async () => {
      it('Should set the booking as approve', async () => {
        const booking = new Booking(validBookingDB);
        await booking.setAsApprove();
        expect(booking).to.have.property('status', BOOKING_STATUS.approve);
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
