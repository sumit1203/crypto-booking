/* eslint-env mocha */
require('dotenv').config({path: './test/utils/.env'});
const { expect } = require('chai');
const {
  onBookingDoneData,
} = require('../../src/services/ethereum-listener');

describe('Secret codes', () => {
  xit('Should send a correct formated email', async () => {
      const returnValues = {
        roomType: 'double',
        nights: [123, 124],
        room: 207,
        guest: '0x944f2E25Bf5A01567277c9D3C8DF1EF6072eE5e4',
        bookingHash: 'someHash'
      };
      const transactionHash = '0x332b8299c847c2455a11287cacf358018a8717dc7f8cb57072f5d9859d577877';
      const a = onBookingDoneData({ returnValues, transactionHash});
  });
});
