const fetch = require('isomorphic-fetch');

const fetchETHPrice = async (unit = 'EUR') => {
  const PRICE_URL = `https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=${unit}`;
  const res = await (await fetch(PRICE_URL)).json();
  const price = parseFloat(res[0].price_eur);
  return price;
};

const fetchLIFPrice = async (unit = 'EUR') => {
  const PRICE_URL = `https://api.coinmarketcap.com/v2/ticker/2728/?convert=${unit}`;
  const res = await (await fetch(PRICE_URL)).json();
  const price = parseFloat(res.data.quotes.EUR.price);
  return price;
};

const fetchPrice = async (type) => {
  return (type === 'eth') ? fetchETHPrice() : fetchLIFPrice();
};

module.exports = {
  fetchETHPrice,
  fetchPrice,
  fetchLIFPrice,
};
