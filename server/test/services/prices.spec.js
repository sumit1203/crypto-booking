/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const { fetchETHPrice, fetchPrice, fetchLIFPrice } = require('../../src/services/prices');

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
    const price = await fetchPrice('líf]');
    expect(price).to.be.a('number');
  });
});
