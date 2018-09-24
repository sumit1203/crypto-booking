const fetch = require('isomorphic-fetch');
const { BOOKING_PAYMENT_TYPES, ETH_DISCOUNT, ROOM_TYPE_PRICES } = require('../constants');
const { handleApplicationError } = require('../errors');
const { COINMARKETCAP_KEY } = require('../config');
const API_URL = process.NODE_ENV === 'production' ? 'https://pro-api.coinmarketcap.com/v1' : 'https://sandbox-api.coinmarketcap.com/v1';

async function getPriceFromAPI (symbol, unit) {
  const PRICE_URL = `${API_URL}/cryptocurrency/quotes/latest?convert=${unit}&symbol=${symbol}`;
  const res = await (await fetch(PRICE_URL, { headers: { 'X-CMC_PRO_API_KEY': COINMARKETCAP_KEY } })).json();
  return parseFloat(res.data[symbol].quote[unit].price);
}

const fetchETHPrice = async (unit = 'EUR') => {
  return getPriceFromAPI('ETH', unit);
};

const fetchLIFPrice = async (unit = 'EUR') => {
  return getPriceFromAPI('LIF', unit);
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
