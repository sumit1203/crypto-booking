/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: '../../../.env.test' });
const { expect } = require('chai');
const {
  getCancelBookingTx,
  web3,
} = require('../../src/services/web3');
const {
  BOOKING_POC_ADDRESS,
} = require('../../src/config');

describe('Web3 services', () => {
  describe(' Generate tx for cancel', () => {
    const roomType = 'basic',
      _nights = [1, 2, 3, 4],
      room = 1,
      bookingHash = web3.utils.sha3('SOME-INFO');
    it('Should generate tx for cancel ETH booking', () => {
      let isEther = true;
      const tx = getCancelBookingTx(roomType, _nights, room, bookingHash, isEther);
      expect(tx).to.be.ok;
      expect(tx).to.have.property('to', BOOKING_POC_ADDRESS);
      expect(tx).to.have.property('data');
      expect(tx).to.have.property('value', 0);
      expect(tx).to.have.property('gas');
    });
    it('Should generate tx for cancel LÍF booking', () => {
      let isEther = false;
      const tx = getCancelBookingTx(roomType, _nights, room, bookingHash, isEther);
      expect(tx).to.be.ok;
      expect(tx).to.have.property('to', BOOKING_POC_ADDRESS);
      expect(tx).to.have.property('data');
      expect(tx).to.have.property('value', 0);
      expect(tx).to.have.property('gas');
    });
  });
});
