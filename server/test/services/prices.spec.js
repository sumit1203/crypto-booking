/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const path = require('path');
require('dotenv').config({ path: path.resolve('../.env.test') });
const { expect } = require('chai');
const nock = require('nock');
const { fetchETHPrice, fetchPrice, fetchLIFPrice } = require('../../src/services/prices');
const quoteETH = require('../utils/nock-responses/quote-eth-success.json');
const quoteLIF = require('../utils/nock-responses/quote-lif-success.json');

// Moke the call to the api for all tests
beforeEach(() => {
  nock('https://sandbox-api.coinmarketcap.com')
    .get('/v1/cryptocurrency/quotes/latest')
    .query({ convert: 'EUR', symbol: 'ETH' })
    .reply(200, quoteETH)
    .get('/v1/cryptocurrency/quotes/latest')
    .query({ convert: 'EUR', symbol: 'LIF' })
    .reply(200, quoteLIF);
});
describe('Prices services', () => {
  it('Should fetch ETH price', async () => {
    const price = await fetchETHPrice();
    expect(price).to.be.a('number');
  });
  it('Should fetch LÍF price', async () => {
    const price = await fetchLIFPrice();
    expect(price).to.be.a('number');
  });
  it('Should fetch price', async () => {
    const price = await fetchPrice('eth');
    expect(price).to.be.a('number');
  });
  it('Should fetch price', async () => {
    const price = await fetchPrice('líf');
    expect(price).to.be.a('number');
  });
});
