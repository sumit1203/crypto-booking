const express = require('express');
const { Booking } = require('../controllers/Booking');
const { sendInstructions } = require('../services/mail');

const router = express.Router();
const bookingUrl = '/booking';

router.post(`${bookingUrl}`, async (req, res, next) => {
  try {
    const { signatureData, booking, offerSignature } = await Booking.create(req.body);
    const data = {
      booking: booking.toPlainObject(),
      offerSignature,
      signatureData,
      contractAddress: process.env.BOOKING_POC_ADDRESS,
    }

    sendInstructions(data, {
      from: process.env.MAILGUN_FROM_EMAIL ,
      to: process.env.MAILGUN_TO_EMAIL,
      subject: 'Hotel reservation instructions'
     });
    res.json(data);
  } catch (e) {
    return next(e);
  }
});

router.get(`${bookingUrl}/:id`, async (req, res, next) => {
  try {
    const booking = await Booking.read({ id: req.params.id });
    if (!booking) return next();
    res.json(booking.toPlainObject());
  } catch (e) {
    return next(e);
  }
});

router.delete(`${bookingUrl}/:id`, async (req, res, next) => {
  try {
    const booking = await Booking.read({ id: req.params.id });
    await booking.delete();
    res.json({ id: req.params.id });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
