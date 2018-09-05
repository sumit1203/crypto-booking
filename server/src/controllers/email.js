const { sendBookingInfoByEmail } = require('../services/booking');

const sendStatus = async (req, res, next) => {
  try {
    await sendBookingInfoByEmail(req.body.bookingHash, parseInt(req.body.bookingIndex));
    res.json({ status: 'ok' });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  sendStatus,
};
