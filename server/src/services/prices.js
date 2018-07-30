const fetch = require('isomorphic-fetch');

const fetchEthPrice = async (unit = 'EUR') => {
  const PRICE_URL = `https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=${unit}`;
  const res = await (await fetch(PRICE_URL)).json();

  // TODO: Add support for eur
  const price = parseFloat(res[0].price_eur);
  return price;
};

module.exports = {
  fetchEthPrice,
};
