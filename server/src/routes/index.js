const express = require('express');
const { createBooking, readBooking, deleteBooking, sendBookingInfoByEmail } = require('../controllers/Booking');
const {
  BOOKING_POC_ADDRESS,
  MAILGUN_FROM_EMAIL,
  MAILGUN_TO_EMAIL,
} = require('../config');
const { createThrottlingInstance } = require('../middlewares/throttling');
const { sendInstructions } = require('../services/mail');

const router = express.Router();
const bookingUrl = '/booking';

router.post(`${bookingUrl}`, async (req, res, next) => {
  try {
    const { signatureData, booking, offerSignature } = await createBooking(req.body);
    const data = {
      booking,
      offerSignature,
      signatureData,
      contractAddress: BOOKING_POC_ADDRESS,
    };

    sendInstructions(data, {
      from: MAILGUN_FROM_EMAIL,
      to: MAILGUN_TO_EMAIL,
      subject: 'Hotel reservation instructions',
    });
    res.json(data);
  } catch (e) {
    return next(e);
  }
});

router.get(`${bookingUrl}/:bookingHash`, async (req, res, next) => {
  try {
    const booking = await readBooking({ bookingHash: req.params.bookingHash });
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
    await sendBookingInfoByEmail(req.body.bookingHash);
    res.json({ status: 'ok' });
  } catch (e) {
    return next(e);
  }
});

router.delete(`${bookingUrl}/:id`, async (req, res, next) => {
  try {
    await deleteBooking({ id: req.params.id });
    res.json({ _id: req.params.id });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
