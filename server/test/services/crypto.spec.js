/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const {
  generateKeyPair,
  getCryptoIndex,
  setCryptoIndex,
  getKeyPair,
} = require('../../src/services/crypto');

describe('Crypto service', () => {
  beforeEach(() => {
    setCryptoIndex(0);
  });
  describe('getCryptoIndex', () => {
    it('Should return the global crypto index', () => {
      expect(getCryptoIndex()).to.be.equal(0);
    });
  });
  describe('setCryptoIndex', () => {
    it('Should set the global crypto index', () => {
      setCryptoIndex(1);
      expect(getCryptoIndex()).to.be.equal(1);
      setCryptoIndex(0);
      expect(getCryptoIndex()).to.be.equal(0);
    });
  });
  describe('generateKeyPair', () => {
    it('Should generate a key pair from the MASTER_KEY', async () => {
      const { publicKey, privateKey, index } = generateKeyPair();
      expect(publicKey).to.be.an('string');
      expect(privateKey).to.be.an('string');
      expect(index).to.be.an('number');
    });
    it('Should generate a new key pair after each call', async () => {
      const { publicKey, privateKey } = generateKeyPair();
      const { publicKey: newPublicKey, privateKey: newPrivateKey } = generateKeyPair();
      expect(publicKey).to.be.not.equal(newPublicKey);
      expect(privateKey).to.be.not.equal(newPrivateKey);
    });
    it('Should increase crypto index after each call', async () => {
      generateKeyPair();
      expect(getCryptoIndex()).to.be.equal(1);
    });
  });
  describe('getKeyPair', () => {
    it('Should return a key pair from a publicKey and an index', async () => {
      const { publicKey, privateKey, index } = generateKeyPair();
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
