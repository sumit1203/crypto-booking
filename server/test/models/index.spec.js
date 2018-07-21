/* eslint-env mocha */
const { assert } = require('chai');

describe('Mongodb connection', () => {
  it('Should throw with missing db uri', () => {
    try {
      process.env.MONGODB_URI = '';
      require('../../src/models');
      throw new Error('should have never been called');
    } catch (e) {
      assert.match(e.message, /MONGODB_URI/i);
    }
  });
});
