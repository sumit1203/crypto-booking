const express = require('express');
const { createBooking, readBooking, getCancelBookingInstructions, sendBookingInfoByEmail } = require('../controllers/Booking');
const {
  BOOKING_POC_ADDRESS,
  FROM_EMAIL,
} = require('../config');
const { createThrottlingInstance } = require('../middlewares/throttling');
const { recaptchaMiddleware } = require('../middlewares/recaptcha');
const { sendInstructions } = require('../services/mail');
const { getInstructionsTxs } = require('../services/web3');

const router = express.Router();
const bookingUrl = '/booking';

router.post(`${bookingUrl}`, recaptchaMiddleware, async (req, res, next) => {
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
      bookingIndex
    };

    sendInstructions(data, {
      from: FROM_EMAIL,
      to: booking.personalInfo.email,
      subject: 'Hotel reservation instructions',
    });
    res.json(data);
  } catch (e) {
    return next(e);
  }
});

router.get(`${bookingUrl}/:bookingHash`, async (req, res, next) => {
  try {
    const booking = await readBooking({ bookingHash: req.params.bookingHash }, parseInt(req.query.bookingIndex));
    if (!booking) return next();
    res.json(booking);
  } catch (e) {
    return next(e);
  }
});

router.post(`${bookingUrl}/emailInfo`, createThrottlingInstance({
  windowMs: 60000, // 1 min
  delayAfter: 2, // Start delaying after first request
  delayMs: 2000, // Delay every subsequent request for 2 seconds
  max: 3, // Start blocking after 3 requests
}), async (req, res, next) => {
  try {
    await sendBookingInfoByEmail(req.body.bookingHash, parseInt(req.body.bookingIndex));
    res.json({ status: 'ok' });
  } catch (e) {
    return next(e);
  }
});

router.delete(`${bookingUrl}`, async (req, res, next) => {
  try {
    const { bookingHash } = req.body;
    const tx = await getCancelBookingInstructions(bookingHash);
    res.status(200).json({ tx });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
