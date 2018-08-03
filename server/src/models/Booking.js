const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SIGNATURE_TIME_LIMIT, ROOM_TYPE_PRICES, BOOKING_PAYMENT_TYPES,
  BOOKING_ROOM_TYPES, BOOKING_STATUS } = require('../constants');
const { handleApplicationError } = require('../errors');
const { web3 } = require('../services/web3');
const { encrypt, decrypt } = require('../services/crypto');

// from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function _isEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function _isBirthDate (birthDate) {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(String(birthDate));
}

function _isPhone (phone) {
  const re = /^\+\d{13}$/;
  return re.test(String(phone));
}

const Booking = new Schema({
  bookingHash: {
    type: String,
    unique: true,
    required: [true, 'noBookingHash'],
  },
  guestEthAddress: {
    type: String,
    required: [true, 'noGuestEthAddress'],
  },
  roomType: {
    type: String,
    enum: BOOKING_ROOM_TYPES,
    required: [true, 'noRoomType'],
  },
  from: {
    type: Number,
    validate: {
      validator: function (from) {
        return from > 0 && from < 5;
      },
      message: 'fromOutOfRange',
    },
    required: [true, 'noFrom'],
  },
  to: {
    type: Number,
    validate: {
      validator: function (to) {
        return to >= this.from && to < 5;
      },
      message: 'toOutOfRange',
    },
    required: [true, 'noTo'],
  },
  paymentAmount: {
    type: Number,
    validate: {
      validator: function (amount) {
        return amount > 0;
      },
      message: 'minAmount',
    },
    required: [true, 'noPaymentAmount'],
  },
  paymentType: {
    type: String,
    enum: [BOOKING_PAYMENT_TYPES.eth, BOOKING_PAYMENT_TYPES.lif],
    required: [true, 'noPaymentType'],
  },
  paymentTx: {
    type: String,
  },
  signatureTimestamp: {
    type: Number,
    default: function () {
      return Math.floor(Date.now() / 1000 - SIGNATURE_TIME_LIMIT * 60);
    },
    required: [true, 'noSignatureTimestamp'],
  },
  encryptedPersonalInfo: {
    type: String,
    required: [true, 'noEncryptedPersonalInfo'],
  },
  confirmationEmailSent: {
    type: Boolean,
    default: false,
  },
  changesEmailSent: {
    type: Number,
    default: function () {
      return Date.now() / 1000;
    },
  },
  status: {
    type: String,
    required: [true, 'noStatus'],
    default: 'pending',
    enum: [BOOKING_STATUS.pending, BOOKING_STATUS.canceled, BOOKING_STATUS.approved],
  },
  guestCount: {
    type: Number,
    validate: {
      validator: function (guestCount) {
        return guestCount >= 1 && guestCount <= 2;
      },
      message: 'guestCountOutOfRange',
    },
    required: [true, 'noGuestCount'],
  },
});

Booking.method({
  encryptPersonalInfo: function (personalInfo, privateKey) {
    if (typeof personalInfo !== 'object') {
      throw handleApplicationError('invalidPersonalInfo');
    }
    if (!personalInfo.email || !_isEmail(personalInfo.email)) {
      throw handleApplicationError('invalidPersonalInfoEmail');
    }
    if (!personalInfo.fullName) {
      throw handleApplicationError('invalidPersonalInfoFullName');
    }
    if (!personalInfo.phone || !_isPhone(personalInfo.phone)) {
      throw handleApplicationError('invalidPersonalInfoPhone');
    }
    if (!personalInfo.birthDate || !_isBirthDate(personalInfo.birthDate)) {
      throw handleApplicationError('invalidPersonalInfoBirthDate');
    }
    if (!privateKey) {
      throw handleApplicationError('noPrivateKey');
    }
    personalInfo = JSON.stringify(personalInfo);
    const hexEncoded = web3.utils.stringToHex(personalInfo);

    this.encryptedPersonalInfo = encrypt(hexEncoded, privateKey).toString();
  },
  decryptPersonalInfo: function (privateKey) {
    let encodedPersonalInfo;
    try {
      encodedPersonalInfo = decrypt(this.encryptedPersonalInfo, privateKey);
    } catch (e) {
      encodedPersonalInfo = null;
    }
    if (!web3.utils.isHex(encodedPersonalInfo)) {
      return {};
    }
    try {
      const personalInfo = web3.utils.hexToString(encodedPersonalInfo);
      return JSON.parse(personalInfo);
    } catch (e) {
      return {};
    }
  },
  generatePaymentAmount: function (cryptoPrice) {
    if (typeof cryptoPrice !== 'number') {
      throw handleApplicationError('invalidCryptoPrice');
    }
    this.paymentAmount = ((ROOM_TYPE_PRICES[this.roomType] * (1 + this.to - this.from) / cryptoPrice) + 0.0001).toFixed(4);
  },
  getWeiPerNight: function (cryptoPrice) {
    if (typeof cryptoPrice !== 'number') {
      throw handleApplicationError('invalidCryptoPrice');
    }
    return web3.utils.toWei((ROOM_TYPE_PRICES[this.roomType] / cryptoPrice).toString(), 'ether');
  },
  setAsPending: function () {
    this.status = BOOKING_STATUS.pending;
    return this.save();
  },
  setAsCanceled: function () {
    this.status = BOOKING_STATUS.canceled;
    return this.save();
  },
  setAsApproved: function () {
    this.status = BOOKING_STATUS.approved;
    return this.save();
  },
});

// Error Handler
Booking.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    return next(handleApplicationError('duplicateBooking'));
  }
  if (!error.errors) {
    return next(error);
  }

  const firstKeyError = Object.keys(error.errors)[0];
  const firstError = error.errors[firstKeyError];
  switch (firstError.name) {
  case 'CastError':
    return next(handleApplicationError(`invalid${firstError.path[0].toUpperCase()}${firstError.path.substring(1)}`));
  default:
    throw handleApplicationError(firstError.message);
  }
});

Booking.statics.generate = function (data, privateKey) {
  const { personalInfo, cryptoPrice, ...rest } = data;
  const BookingModel = this.model('Booking');
  const booking = new BookingModel(rest);
  booking.encryptPersonalInfo(personalInfo, privateKey);
  booking.generatePaymentAmount(cryptoPrice);
  return booking;
};

module.exports = { Booking: mongoose.model('Booking', Booking) };
