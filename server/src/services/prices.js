const fetch = require('isomorphic-fetch');

const fetchEthPrice = async (unit = 'USD') => {
  const PRICE_URL = `https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=${unit}`;
  const res = await (await fetch(PRICE_URL)).json();

  // TODO: Add support for eur
  const price = parseFloat(res[0].price_usd);
  return price;
};

module.exports = {
  fetchEthPrice,
};
