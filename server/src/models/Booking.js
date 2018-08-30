const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const { SIGNATURE_TIME_LIMIT, BOOKING_PAYMENT_TYPES,
  BOOKING_ROOM_TYPES, BOOKING_STATUS } = require('../constants');
const { handleApplicationError } = require('../errors');
const { web3 } = require('../services/web3');
const { encrypt, decrypt, generateKeyPair } = require('../services/crypto');
const { getRoomPrice } = require('../services/prices');

autoIncrement.initialize(mongoose.connection);
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
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
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
    validate: {
      validator: (guestEthAddress) => web3.utils.isAddress(guestEthAddress),
      message: 'guestEthAddressChecksum',
    },
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
  roomNumber: {
    type: Number,
    default: null,
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
      console.error(e);
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
  generatePaymentAmount: async function (cryptoPrice) {
    this.paymentAmount = await this.getWeiPerNight(cryptoPrice);
  },
  getWeiPerNight: async function (cryptoPrice) {
    if (typeof cryptoPrice !== 'number') {
      throw handleApplicationError('invalidCryptoPrice');
    }
    if (BOOKING_ROOM_TYPES.indexOf(this.roomType) === -1) {
      throw handleApplicationError('invalidRoomType');
    }
    let priceInCrypto = await getRoomPrice(this.roomType, this.paymentType) / cryptoPrice;
    const decimals = 4;
    const fixedAdd = 0.0001;
    priceInCrypto = Math.round((priceInCrypto + fixedAdd) * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return web3.utils.toWei(priceInCrypto.toString(), 'ether');
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
    this.confirmationEmailSent = true;
    return this.save();
  },
  getFromDate: function () {
    const day = 5 + this.from;
    return `${day}/9/2018`;
  },
  getToDate: function () {
    const day = 5 + this.to + 1;/* are nights so we need to add one more day */
    return `${day}/9/2018`;
  },
  getRemainingMinutes: function () {
    const limit = Math.floor(Date.now() / 1000 - 2 * SIGNATURE_TIME_LIMIT * 60);
    return Math.abs(Math.floor((limit - this.signatureTimestamp) / 60));
  },
});

// Error Handler
Booking.post('save', function (error, doc, next) {
  next(_errorHandler(error));
});

Booking.statics.generate = async function (data) {
  const index = await (new Promise((resolve, reject) => {
    const BookingModel = this.model('Booking');
    BookingModel.nextCount((err, nextCount) => {
      if (err) return reject(err);
      return resolve(nextCount);
    });
  }));
  const { privateKey, publicKey } = generateKeyPair(index);
  data.bookingHash = publicKey;
  const { personalInfo, cryptoPrice, ...rest } = data;
  const BookingModel = this.model('Booking');
  const booking = new BookingModel(rest);
  booking.encryptPersonalInfo(personalInfo, privateKey);
  await booking.generatePaymentAmount(cryptoPrice);
  return booking;
};

Booking.statics.resetIndex = function () {
  return new Promise((resolve, reject) => {
    const BookingModel = this.model('Booking');
    BookingModel.resetCount((err, nextCount) => {
      if (err) return reject(err);
      return resolve(nextCount);
    });
  });
};

Booking.statics.nextIndex = function () {
  return new Promise((resolve, reject) => {
    const BookingModel = this.model('Booking');
    BookingModel.nextCount((err, nextCount) => {
      if (err) return reject(err);
      return resolve(nextCount);
    });
  });
};

function _errorHandler (error) {
  if (error.name === 'MongoError' && error.code === 11000) {
    return handleApplicationError('duplicateBooking');
  }
  if (!error.errors) {
    return error;
  }
  const firstKeyError = Object.keys(error.errors)[0];
  const firstError = error.errors[firstKeyError];
  switch (firstError.name) {
  case 'CastError':
    return handleApplicationError(`invalid${firstError.path[0].toUpperCase()}${firstError.path.substring(1)}`);
  case 'ValidatorError':
    if (firstError.kind === 'enum') {
      return handleApplicationError(`invalid${firstError.path[0].toUpperCase()}${firstError.path.substring(1)}`);
    }
    return handleApplicationError(firstError.message);
  default:
    return handleApplicationError(firstError.message);
  }
}

Booking.plugin(autoIncrement.plugin, { model: 'Booking', field: 'bookingIndex' });

module.exports = { Booking: mongoose.model('Booking', Booking) };
