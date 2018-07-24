const express = require('express');
const { Booking } = require('../controllers/Booking');

const router = express.Router();
const bookingUrl = '/booking';

router.post(`${bookingUrl}`, async (req, res, next) => {
  try {
    const { booking, signedOffer } = await Booking.create(req.body);
    res.json({
      booking: booking.toPlainObject(),
      signedOffer,
      BookingContract: process.env.BOOKING_POC_ADDRESS,
    });
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
