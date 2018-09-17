const { getRoomPrice } = require('../services/prices');
const { handleApplicationError } = require('../errors');

async function read (req, res, next) {
  let { paymentTypes } = req.query;
  const { roomType } = req.params;
  try {
    if (!(paymentTypes instanceof Array)) {
      throw handleApplicationError('noPaymentTypes');
    }
    const paymentsPromise = paymentTypes.map(async (type) => {
      try {
        const price = await getRoomPrice(roomType, type);
        return {
          paymentType: type,
          price: price,
        };
      } catch (e) {
        if (e.code === '#invalidRoomType') {
          throw e;
        }
        return {
          paymentType: type,
          error: e,
        };
      }
    });
    const prices = await Promise.all(paymentsPromise);
    res.json(prices);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  read,
};
