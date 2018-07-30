const mongoose = require('mongoose');
const BookingModel = mongoose.model('Booking');
const { fetchEthPrice } = require('../services/prices');
const { readKey, signOffer } = require('../services/secret-codes');
const { sendBookingInfo } = require('../services/mail');
const { handleApplicationError } = require('../errors');
const { TO_EMAIL, FROM_EMAIL } = require('../config');
/**
  * Creates a new Booking in the db and returns an instance of Booking
  * @param {Object} {publicKey, guestEthAddress, payment, personalInfo}
  * @return {Booking}
  */
async function createBooking (data) {
  data.ethPrice = await fetchEthPrice();
  const bookingModel = BookingModel.generate(data);
  await bookingModel.save();
  const booking = _prepareForExport(bookingModel, bookingModel.bookingHash);
  booking.weiPerNight = bookingModel.getWeiPerNight(data.ethPrice);
  const { signatureData, offerSignature } = await signOffer(booking, await readKey());

  return {
    booking,
    offerSignature,
    signatureData,
  };
}

function _prepareForExport (bookingModel, bookingHash) {
  const booking = bookingModel.toObject();
  booking.personalInfo = bookingModel.decryptPersonalInfo(bookingHash);
  return booking;
}

/**
  * Finds the booking in the bd and returns an instance of Booking
  * @param {Object} {id: <Booking_id>}
  * @return {Booking || null}
  */
async function readBooking (filter) {
  if (mongoose.Types.ObjectId.isValid(filter.id)) {
    const bookingModel = await BookingModel.findById(filter.id).exec();
    if (!bookingModel) return null;
    return _prepareForExport(bookingModel);
  }
  if (filter.bookingHash) {
    const bookingModel = await BookingModel.findOne({ bookingHash: filter.bookingHash }).exec();
    if (!bookingModel) return null;
    return _prepareForExport(bookingModel, filter.bookingHash);
  }
  return null;
}

async function deleteBooking (filter) {
  if (mongoose.Types.ObjectId.isValid(filter.id)) {
    await BookingModel.deleteOne({ id: filter.id }).exec();
  }
  return null;
}

async function confirmationEmailSentBooking (id) {
  const bookingModel = await BookingModel.findById(id).exec();
  bookingModel.confirmationEmailSent = true;
  return bookingModel.save();
}

async function changesEmailSentBooking (id) {
  const bookingModel = await BookingModel.findById(id).exec();
  bookingModel.changesEmailSent = Date.now() / 1000;
  return bookingModel.save();
}

async function sendBookingInfoByEmail (bookingHash) {
  const booking = await readBooking({ bookingHash });
  if (!booking) {
    throw handleApplicationError('sendBookingInfoFail');
  }

  return sendBookingInfo(booking, {
    from: FROM_EMAIL,
    to: TO_EMAIL,
  });
}

module.exports = {
  readBooking,
  createBooking,
  deleteBooking,
  confirmationEmailSentBooking,
  changesEmailSentBooking,
  sendBookingInfoByEmail,
};
