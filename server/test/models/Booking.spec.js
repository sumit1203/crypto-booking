/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect, assert } = require('chai');
const { Booking } = require('../../src/models/Booking');
const validBooking = {
  publicKey: 'some public key',
  guestAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  payment: {
    amount: 0.1,
    type: 'eth',
    tx: 'some tx',
  },
  signatureTimestamp: 1532196084,
  personalInfo: 'some encrypted personal info',
};

function basicValidationExpect (validation, field) {
  expect(validation).to.have.property('errors');
  expect(validation.errors).to.have.property(field);
}

describe('Booking schema', () => {
  it('Should generate no error using validBooking data', () => {
    const booking = new Booking(validBooking);
    const validation = booking.validateSync();
    expect(validation).to.be.a('undefined');
    expect(booking).to.have.property('publicKey', validBooking.publicKey);
    expect(booking).to.have.property('guestAddress', validBooking.guestAddress);
    expect(booking).to.have.property('payment');
    expect(booking.payment).to.have.property('amount', validBooking.payment.amount);
    expect(booking.payment).to.have.property('type', validBooking.payment.type);
    expect(booking.payment).to.have.property('tx', validBooking.payment.tx);
    expect(booking).to.have.property('signatureTimestamp', validBooking.signatureTimestamp);
    expect(booking).to.have.property('personalInfo', validBooking.personalInfo);
  });

  describe('publicKey', () => {
    it('Should have the property publicKey with type string', () => {
      const booking = new Booking(validBooking);
      const newPublicKey = 'some new public key';
      booking.publicKey = newPublicKey;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.publicKey).to.be.a('string');
    });

    it('Should throw an error if publicKey is not defined', () => {
      const booking = new Booking(validBooking);
      booking.publicKey = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'publicKey');
      expect(validation.errors.publicKey).to.have.property('message', 'noPublicKey');
    });
  });

  describe('guestAddress', () => {
    it('Should have the property guestAddress with type string', () => {
      const booking = new Booking(validBooking);
      booking.guestAddress = 123;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.guestAddress).to.be.a('string');
    });

    it('Should throw an error if guestAddress is not defined', () => {
      const booking = new Booking(validBooking);
      booking.guestAddress = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'guestAddress');
      expect(validation.errors.guestAddress).to.have.property('message', 'noGuestAddress');
    });
  });

  describe('payment amount', () => {
    it('Should have the property payment.amount with type number', () => {
      const booking = new Booking(validBooking);
      booking.payment.amount = 'asdas';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.amount');
      assert.match(validation.errors['payment.amount'].message, /cast to number/i);
    });

    it('Should throw an error if payment.amount is not defined', () => {
      const booking = new Booking(validBooking);
      booking.payment.amount = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.amount');
      expect(validation.errors['payment.amount']).to.have.property('message', 'noPaymentAmount');
    });

    it('Should throw an error if payment.amount equal or less than 0', () => {
      const booking = new Booking(validBooking);
      booking.payment.amount = 0;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.amount');
      expect(validation.errors['payment.amount']).to.have.property('message', 'minAmount');
    });
  });

  describe('payment type', () => {
    it('Should allow to set payment.type as "lif"', () => {
      const booking = new Booking(validBooking);
      booking.payment.type = 'lif';
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.payment.type).to.be.equal('lif');
    });

    it('Should throw an error if payment.type is not "eth" or "lif"', () => {
      const booking = new Booking(validBooking);
      booking.payment.type = 'some invalid type';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.type');
      expect(validation.errors['payment.type']).to.have.property('kind', 'enum');
    });

    it('Should throw an error if payment.type is not defined', () => {
      const booking = new Booking(validBooking);
      booking.payment.type = undefined;
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.type');
      expect(validation.errors['payment.type']).to.have.property('message', 'noPaymentType');
    });
  });

  describe('payment tx', () => {
    it('Should have the property payment.tx with type string', () => {
      const booking = new Booking(validBooking);
      const newPaymentTx = 'some new payment tx';
      booking.payment.tx = newPaymentTx;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.payment.tx).to.be.equal(newPaymentTx);
    });

    it('Should throw an error if payment.tx is not defined', () => {
      const booking = new Booking(validBooking);
      booking.payment.tx = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'payment.tx');
      expect(validation.errors['payment.tx']).to.have.property('message', 'noPaymentTx');
    });
  });

  describe('signatureTimestamp', () => {
    it('Should have the property signatureTimestamp with type number', () => {
      const booking = new Booking(validBooking);
      booking.signatureTimestamp = 'asdas';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'signatureTimestamp');
      assert.match(validation.errors.signatureTimestamp.message, /cast to number/i);
    });

    it('Should throw an error if signatureTimestamp is not defined', () => {
      const booking = new Booking(validBooking);
      booking.signatureTimestamp = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'signatureTimestamp');
      expect(validation.errors.signatureTimestamp).to.have.property('message', 'noSignatureTimestamp');
    });
  });

  describe('personalInfo', () => {
    it('Should have the property personalInfo with type string', () => {
      const booking = new Booking(validBooking);
      const newPersonalInfo = 'some new payment tx';
      booking.personalInfo = newPersonalInfo;
      const validation = booking.validateSync();
      expect(validation).to.be.a('undefined');
      expect(booking.personalInfo).to.be.equal(newPersonalInfo);
    });

    it('Should throw an error if personalInfo is not defined', () => {
      const booking = new Booking(validBooking);
      booking.personalInfo = '';
      const validation = booking.validateSync();
      basicValidationExpect(validation, 'personalInfo');
      expect(validation.errors.personalInfo).to.have.property('message', 'noPersonalInfo');
    });
  });
});
