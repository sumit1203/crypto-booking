const crypto = require('crypto');
const bitcoin = require('bitcoinjs-lib');
const { web3 } = require('./web3');
const {
  MASTER_KEY,
} = require('../config');

const { handleApplicationError } = require('../errors');

function _getExtendedKeyByIndex (index) {
  if (!MASTER_KEY) {
    throw handleApplicationError('noMasterKey');
  }
  const network = bitcoin.networks.bitcoin;
  const root = bitcoin.bip32.fromBase58(MASTER_KEY, network);
  return root.derivePath(`m/44'/60'/${index}'/0/0`);
}

function _getKeyPair (index) {
  const child = _getExtendedKeyByIndex(index);
  const privateKey = web3.utils.sha3(child.toBase58());
  const publicKey = web3.utils.sha3(child.neutered().toBase58());
  return { privateKey, publicKey };
}

function generateKeyPair (index) {
  const { privateKey, publicKey } = _getKeyPair(index);
  return {
    privateKey,
    publicKey,
    index,
  };
}

function getKeyPair (publicKeyToValidate, index) {
  const emptyPair = { privateKey: null, publicKey: null };
  if (typeof index !== 'number' || isNaN(index)) {
    return emptyPair;
  }
  const { privateKey, publicKey } = _getKeyPair(index);
  if (publicKeyToValidate !== publicKey) {
    return emptyPair;
  }
  return { privateKey, publicKey };
}

function encrypt (data, hash, algorithm = 'aes256') {
  const cipher = crypto.createCipher(algorithm, hash);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt (text, hash, algorithm = 'aes256') {
  const decipher = crypto.createDecipher(algorithm, hash);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = { encrypt, decrypt, generateKeyPair, getKeyPair };
