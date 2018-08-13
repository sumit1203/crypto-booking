const express = require('express');
const { createThrottlingInstance } = require('../middlewares/throttling');
const { recaptchaMiddleware } = require('../middlewares/recaptcha');
const booking = require('../controllers/booking');
const email = require('../controllers/email');

const router = express.Router();
const bookingUrl = '/booking';

router.post(`${bookingUrl}`, recaptchaMiddleware, booking.create);

router.get(`${bookingUrl}/:bookingHash`, booking.read);

router.post(`${bookingUrl}/emailInfo`, createThrottlingInstance({
  windowMs: 60000, // 1 min
  delayAfter: 2, // Start delaying after first request
  delayMs: 2000, // Delay every subsequent request for 2 seconds
  max: 3, // Start blocking after 3 requests
}), email.sendStatus);

router.delete(`${bookingUrl}`, booking.remove);

module.exports = router;
