/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect, assert } = require('chai');
const { Booking } = require('../../src/models/Booking');
const { validBookingDB } = require('../utils/test-data');

function basicValidationExpect (validation, field) {
  expect(validation).to.have.property('errors');
  expect(validation.errors).to.have.property(field);
}

describe('Booking schema', () => {
  it('Should generate no error using validBookingDB data', () => {
    const booking = new Booking(validBookingDB);
    const validation = booking.validateSync();
    expect(validation).to.be.a('undefined');
    expect(booking).to.have.property('publicKey', validBookingDB.publicKey);
    expect(booking).to.have.property('guestEthAddress', validBookingDB.guestEthAddress);
    expect(booking).to.have.property('payment');
    expect(booking.payment).to.have.property('amount', validBookingDB.payment.amount);
    expect(booking.payment).to.have.property('type', validBookingDB.payment.type);
    expect(booking.payment).to.have.property('tx', validBookingDB.payment.tx);
    expect(booking).to.have.property('signatureTimestamp');
    expect(booking).to.have.property('personalInfo', validBookingDB.personalInfo);
  });

  describe('publicKey', () => {
    it('Should have the property publicKey with type string', () => {
      const booking = new Booking(validBookingDB);
      const newPublicKey = 'some new public key';
      booking.publicKey = newPublicKey;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.publicKey).to.be.a('string');
    });

    it('Should throw an error if publicKey is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.publicKey = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'publicKey');
      expect(validation.errors.publicKey).to.have.property('message', 'noPublicKey');
    });
  });

  describe('guestEthAddress', () => {
    it('Should have the property guestEthAddress with type string', () => {
      const booking = new Booking(validBookingDB);
      booking.guestEthAddress = 123;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.guestEthAddress).to.be.a('string');
    });

    it('Should throw an error if guestEthAddress is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.guestEthAddress = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'guestEthAddress');
      expect(validation.errors.guestEthAddress).to.have.property('message', 'noGuestEthAddress');
    });
  });

  describe('payment amount', () => {
    it('Should have the property payment.amount with type number', () => {
      const booking = new Booking(validBookingDB);
      booking.payment.amount = 'asdas';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.amount');
      assert.match(validation.errors['payment.amount'].message, /cast to number/i);
    });

    it('Should throw an error if payment.amount is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.payment.amount = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.amount');
      expect(validation.errors['payment.amount']).to.have.property('message', 'noPaymentAmount');
    });

    it('Should throw an error if payment.amount equal or less than 0', () => {
      const booking = new Booking(validBookingDB);
      booking.payment.amount = 0;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.amount');
      expect(validation.errors['payment.amount']).to.have.property('message', 'minAmount');
    });
  });

  describe('payment type', () => {
    it('Should allow to set payment.type as "lif"', () => {
      const booking = new Booking(validBookingDB);
      booking.payment.type = 'lif';
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.payment.type).to.be.equal('lif');
    });

    it('Should throw an error if payment.type is not "eth" or "lif"', () => {
      const booking = new Booking(validBookingDB);
      booking.payment.type = 'some invalid type';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.type');
      expect(validation.errors['payment.type']).to.have.property('kind', 'enum');
    });

    it('Should throw an error if payment.type is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.payment.type = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.type');
      expect(validation.errors['payment.type']).to.have.property('message', 'noPaymentType');
    });
  });

  describe('payment tx', () => {
    it('Should have the property payment.tx with type string', () => {
      const booking = new Booking(validBookingDB);
      const newPaymentTx = 'some new payment tx';
      booking.payment.tx = newPaymentTx;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.payment.tx).to.be.equal(newPaymentTx);
    });
  });

  describe('signatureTimestamp', () => {
    it('Should have the property signatureTimestamp with type date', () => {
      const booking = new Booking(validBookingDB);
      booking.signatureTimestamp = 'asdas';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'signatureTimestamp');
      assert.match(validation.errors.signatureTimestamp.message, /cast to date/i);
    });
  });

  describe('personalInfo', () => {
    it('Should have the property personalInfo with type string', () => {
      const booking = new Booking(validBookingDB);
      const newPersonalInfo = 'some new payment tx';
      booking.personalInfo = newPersonalInfo;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.personalInfo).to.be.equal(newPersonalInfo);
    });

    it('Should throw an error if personalInfo is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.personalInfo = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'personalInfo');
      expect(validation.errors.personalInfo).to.have.property('message', 'noPersonalInfo');
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

    it('Should throw an error if personalInfo is not defined', () => {
      const booking = new Booking(validBookingDB);
      booking.roomType = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'roomType');
      expect(validation.errors.roomType).to.have.property('message', 'noRoomType');
    });
  });

  describe('from', () => {
    it('Should allow to set from as a number between 1 an 4', () => {
      const booking = new Booking(validBookingDB);
      let validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.from).to.be.equal(validBookingDB.from);
    });

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
    it('Should allow to set "to" as a number between 1 an 4', () => {
      const booking = new Booking(validBookingDB);
      let validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.to).to.be.equal(validBookingDB.to);
    });

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
});
