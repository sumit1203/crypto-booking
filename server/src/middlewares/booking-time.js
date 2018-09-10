const { handleApplicationError } = require('../errors');
const { BOOKING_PERIOD_START, BOOKING_PERIOD_END } = require('../config');

let isBookingPeriodOff = false;

const turnOffBookingPeriod = () => {
  isBookingPeriodOff = true;
};

const turnOnBookingPeriod = () => {
  isBookingPeriodOff = false;
};

const isBookingPeriod = function (req, res, next) {
  if (isBookingPeriodOff) return next();

  const today = new Date(Date.now());
  if (today.getTime() < BOOKING_PERIOD_START.getTime()) {
    return next(handleApplicationError('BookingPeriodStart'));
  }

  if (BOOKING_PERIOD_END.getTime() < today.getTime()) {
    return next(handleApplicationError('BookingPeriodEnd'));
  }

  next();
};

module.exports = {
  isBookingPeriod,
  turnOffBookingPeriod,
  turnOnBookingPeriod,
};
