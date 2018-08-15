const { readBooking, getCancelBookingInstructions, createBooking } = require('../services/booking');
const { BOOKING_POC_ADDRESS } = require('../config');
const { sendInstructions } = require('../services/mail');
const { getInstructionsTxs } = require('../services/web3');

const create = async (req, res, next) => {
  try {
    const { signatureData, booking, offerSignature, bookingIndex } = await createBooking(req.body);
    const nights = [];
    for (let i = booking.from; i <= booking.to; i++) {
      nights.push(i);
    }

    const data = {
      txs: await getInstructionsTxs(booking.paymentType, signatureData, offerSignature, nights),
      booking,
      offerSignature,
      signatureData,
      contractAddress: BOOKING_POC_ADDRESS,
      bookingIndex,
      nights,
    };
    sendInstructions(data, booking.personalInfo.email);
    res.json(data);
  } catch (e) {
    return next(e);
  }
};

const read = async (req, res, next) => {
  try {
    const booking = await readBooking({ bookingHash: req.params.bookingHash }, parseInt(req.query.bookingIndex));
    if (!booking) return next();
    res.json(booking);
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { bookingHash } = req.body;
    const tx = await getCancelBookingInstructions(bookingHash);
    res.status(200).json({ tx });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  create,
  read,
  remove,
};
