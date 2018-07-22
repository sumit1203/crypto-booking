/* eslint-env mocha */
const { expect } = require('chai');
const { encodeHex, decodeHex } = require('../../src/utils/hex');

describe('Hex utils', () => {
  describe('encodeHex', () => {
    it('Should return a valid hexadecimal', () => {
      expect(encodeHex('some string')).to.be.equal('736f6d6520737472696e67');
    });
  });
  describe('decodeHex', () => {
    it('Should return a valid hexadecimal', () => {
      expect(decodeHex('736f6d6520737472696e67')).to.be.equal('some string');
    });
  });
});
