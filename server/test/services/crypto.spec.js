/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const {
  generateKeyPair,
  getKeyPair,
} = require('../../src/services/crypto');

describe('Crypto service', () => {
  describe('generateKeyPair', () => {
    it('Should generate a key pair from the MASTER_KEY', async () => {
      const { publicKey, privateKey, index } = generateKeyPair(0);
      expect(publicKey).to.be.an('string');
      expect(privateKey).to.be.an('string');
      expect(index).to.be.an('number');
    });
  });
  describe('getKeyPair', () => {
    it('Should return a key pair from a publicKey and an index', async () => {
      const { publicKey, privateKey, index } = generateKeyPair(0);
      const { publicKey: newPublicKey, privateKey: newPrivateKey } = getKeyPair(publicKey, index);
      expect(publicKey).to.be.equal(newPublicKey);
      expect(privateKey).to.be.equal(newPrivateKey);
    });
    it('Should return a null key pair if the publicKey didn\'t match', async () => {
      const { publicKey, privateKey } = getKeyPair('some fake public key', 0);
      expect(publicKey).to.be.equal(null);
      expect(privateKey).to.be.equal(null);
    });
  });
});
