const mongoose = require('mongoose');
const BookingModel = mongoose.model('Booking');
const { fetchPrice } = require('../services/prices');
const { readKey, signOffer } = require('../services/secret-codes');
const { sendBookingInfo, sendBookingCanceled } = require('../services/mail');
const { handleApplicationError } = require('../errors');
const { generateKeyPair, getKeyPair } = require('../services/crypto');
const {
  getCancelBookingTx,
} = require('../services/web3');
const { FROM_EMAIL } = require('../config');
const {
  SIGNATURE_TIME_LIMIT,
  BOOKING_PAYMENT_TYPES,
  BOOKING_STATUS,
} = require('../constants');

async function _generateBooking (data) {
  const index = await BookingModel.nextIndex();
  const { privateKey, publicKey, index: bookingIndex } = generateKeyPair(index);
  data.bookingHash = publicKey;
  try {
    const bookingModel = await BookingModel.generate(data, privateKey);
    await bookingModel.save();
    return { bookingModel, privateKey, bookingIndex };
  } catch (e) {
    if (e.code !== '#duplicateBooking') {
      throw e;
    }
    return _generateBooking(data);
  }
}

/**
  * Creates a new Booking in the db and returns an instance of Booking
  * @param {Object} {publicKey, guestEthAddress, payment, personalInfo}
  * @return {Booking}
  */
async function createBooking (data) {
  data.cryptoPrice = await fetchPrice(data.paymentType);
  const { bookingModel, bookingIndex, privateKey } = await _generateBooking(data);
  const booking = _prepareForExport(bookingModel, privateKey);
  booking.weiPerNight = bookingModel.getWeiPerNight(data.cryptoPrice);
  const { signatureData, offerSignature } = await signOffer(booking, await readKey());

  return {
    booking,
    offerSignature,
    signatureData,
    bookingIndex,
    privateKey,
  };
}

function _prepareForExport (bookingModel, privateKey) {
  const booking = bookingModel.toObject();
  booking.personalInfo = bookingModel.decryptPersonalInfo(privateKey);
  booking.fromDate = bookingModel.getFromDate();
  booking.toDate = bookingModel.getToDate();
  booking.remaindingMinues = bookingModel.getRemaindingMinutes();
  return booking;
}

/**
  * Finds the booking in the bd and returns an instance of Booking
  * @param {Object} {id: <Booking_id>}
  * @return {Booking || null}
  */
async function readBooking (filter, index) {
  if (mongoose.Types.ObjectId.isValid(filter.id)) {
    const bookingModel = await BookingModel.findById(filter.id).exec();
    if (!bookingModel) return null;
    return _prepareForExport(bookingModel);
  }
  if (filter.bookingHash) {
    const bookingModel = await BookingModel.findOne({ bookingHash: filter.bookingHash }).exec();
    if (!bookingModel) return null;
    const { privateKey } = getKeyPair(filter.bookingHash, index);
    return _prepareForExport(bookingModel, privateKey);
  }
  return null;
}

async function getCancelBookingInstructions (bookingHash) {
  if (!bookingHash) {
    throw handleApplicationError('noBookingHashFromClient');
  }
  const bookingModel = await BookingModel.findOne({ bookingHash }).exec();
  if (!bookingModel || bookingModel.status !== BOOKING_STATUS.approved) {
    throw handleApplicationError('bookingNotFound');
  }
  const { roomType, roomNumber, from, to, paymentType } = bookingModel;
  const isEther = paymentType === BOOKING_PAYMENT_TYPES.eth;
  const nights = [];
  for (let i = from; i <= to; i++) {
    nights.push(i);
  }
  const tx = getCancelBookingTx(roomType, nights, roomNumber, bookingHash, isEther);
  return tx;
}

async function _getDecryptedBooking (bookingModel) {
  const index = await getBookingIndex(bookingModel._id);
  const { privateKey } = getKeyPair(bookingModel.bookingHash, index);
  return _prepareForExport(bookingModel, privateKey);
}

async function confirmBooking (bookingHash) {
  const bookingModel = await BookingModel.findOne({ bookingHash }).exec();
  await bookingModel.setAsApproved();
  return _getDecryptedBooking(bookingModel);
}

async function changesEmailSentBooking (bookingHash) {
  const bookingModel = await BookingModel.findOne({ bookingHash }).exec();
  bookingModel.changesEmailSent = Date.now() / 1000;
  return bookingModel.save();
}

async function sendBookingInfoByEmail (bookingHash, index) {
  const booking = await readBooking({ bookingHash }, index);
  if (!booking) {
    throw handleApplicationError('sendBookingInfoFail');
  }

  return sendBookingInfo(booking, {
    from: FROM_EMAIL,
    to: booking.personalInfo.email,
  });
}

const checkBookingExpired = async () => {
  const limit = Math.floor(Date.now() / 1000 - 2 * SIGNATURE_TIME_LIMIT * 60);
  const bookings = await BookingModel.find({
    $and: [
      { signatureTimestamp: { $lt: limit } },
      { status: { $eq: BOOKING_STATUS.pending } },
    ],
  });
  return bookings.map(async (booking) => {
    await booking.setAsCanceled();
    return booking._id;
  });
};

// IMPORTANT: this function must receive an string or the value of `_id`
// otherwise will be return a wrong index.
async function getBookingIndex (id) {
  const objectId = mongoose.Types.ObjectId(id);
  return BookingModel.countDocuments({ _id: { $lt: objectId } }).exec();
}

async function cancelBooking (bookingHash) {
  const bookingModel = await BookingModel.findOne({ bookingHash }).exec();
  await bookingModel.setAsCanceled();
  const booking = await _getDecryptedBooking(bookingModel);
  return sendBookingCanceled(booking.bookingHash, booking.personalInfo.email);
}
const updateRoom = async function (bookingHash, roomNumber) {
  const bookingModel = await BookingModel.findOne({ bookingHash }).exec();
  bookingModel.roomNumber = roomNumber;
  return bookingModel.save();
};

module.exports = {
  readBooking,
  createBooking,
  getCancelBookingInstructions,
  confirmBooking,
  changesEmailSentBooking,
  sendBookingInfoByEmail,
  checkBookingExpired,
  cancelBooking,
  getBookingIndex,
  updateRoom,
};
