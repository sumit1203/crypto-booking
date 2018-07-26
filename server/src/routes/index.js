const express = require('express');
const { createBooking, readBooking, deleteBooking } = require('../controllers/Booking');
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
      contractAddress: process.env.BOOKING_POC_ADDRESS,
    };

    sendInstructions(data, {
      from: process.env.MAILGUN_FROM_EMAIL,
      to: process.env.MAILGUN_TO_EMAIL,
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

router.delete(`${bookingUrl}/:id`, async (req, res, next) => {
  try {
    await deleteBooking({ id: req.params.id });
    res.json({ _id: req.params.id });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
