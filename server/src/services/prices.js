const fetch = require('isomorphic-fetch');
const { BOOKING_PAYMENT_TYPES, ETH_DISCOUNT, ROOM_TYPE_PRICES } = require('../constants');
const { handleApplicationError } = require('../errors');

const fetchETHPrice = async (unit = 'EUR') => {
  const PRICE_URL = `https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=${unit}`;
  const res = await (await fetch(PRICE_URL)).json();
  const price = parseFloat(res[0].price_eur);
  return price;
};

const fetchLIFPrice = async (unit = 'EUR') => {
  const PRICE_URL = 'https://api.coinmarketcap.com/v2/ticker/2728/?convert=EUR';
  const res = await (await fetch(PRICE_URL)).json();
  const price = parseFloat(res.data.quotes.EUR.price);
  return price;
};

const fetchPrice = async (type) => {
  return (type === 'eth') ? fetchETHPrice() : fetchLIFPrice();
};

const getLIFRoomPrice = async (roomType) => {
  if (!ROOM_TYPE_PRICES[roomType]) {
    throw handleApplicationError('invalidRoomType');
  }
  return ROOM_TYPE_PRICES[roomType] * await fetchLIFPrice() / 0.5;
};

const getETHRoomPrice = async (roomType) => {
  if (!ROOM_TYPE_PRICES[roomType]) {
    throw handleApplicationError('invalidRoomType');
  }
  return ROOM_TYPE_PRICES[roomType] * (1 - ETH_DISCOUNT);
};

const getRoomPrice = async (roomType, paymentType) => {
  switch (paymentType) {
  case BOOKING_PAYMENT_TYPES.eth:
    return getETHRoomPrice(roomType);
  case BOOKING_PAYMENT_TYPES.lif:
    return getLIFRoomPrice(roomType);
  default:
    throw handleApplicationError('invalidPaymentType');
  }
};

module.exports = {
  fetchETHPrice,
  fetchPrice,
  fetchLIFPrice,
  getRoomPrice,
};
