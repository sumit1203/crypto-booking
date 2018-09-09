const { handleApplicationError } = require('../errors');
const { BOOKING_PERIOD_START, BOOKING_PERIOD_END } = require('../config');

const isBookingPeriod = function (req, res, next) {
  const today = Date.now();
  if (today.getTime() < BOOKING_PERIOD_START.getTime()) {
    return next(handleApplicationError('BookingPeriodStart'));
  }

  if (BOOKING_PERIOD_END.getTime() < today.getTime()) {
    return next('BookingPeriodEnd');
  }

  next();
};

module.exports = {
  isBookingPeriod,
};
