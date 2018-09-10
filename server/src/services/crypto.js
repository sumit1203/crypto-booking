const crypto = require('crypto');
const bitcoin = require('bitcoinjs-lib');
const { web3 } = require('./web3');
const {
  MASTER_KEY,
  OWNER_PRIVATE_KEY,
  OWNER_ADDRESS,
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

const readKey = async () => {
  // TODO: Store encrypted
  const key = {
    privateKey: OWNER_PRIVATE_KEY,
    address: OWNER_ADDRESS,
  };
  return key;
};

const signOffer = async (booking, key) => {
  const signatureData = {
    roomType: booking.roomType,
    weiPerNight: booking.weiPerNight,
    signatureTimestamp: booking.signatureTimestamp,
    paymentType: booking.paymentType,
    bookingHash: booking.bookingHash,
  };
  const hashedMessage = web3.utils.soliditySha3(
    { type: 'string', value: signatureData.roomType },
    { type: 'uint256', value: signatureData.weiPerNight },
    { type: 'uint256', value: signatureData.signatureTimestamp },
    { type: 'string', value: signatureData.paymentType },
    { type: 'bytes32', value: signatureData.bookingHash }
  );

  web3.eth.accounts.wallet.add(OWNER_PRIVATE_KEY);
  const accounts = web3.eth.accounts.wallet;
  const offerSignature = await web3.eth.sign(hashedMessage, OWNER_ADDRESS);
  web3.eth.accounts.wallet.clear();

  return { signatureData, offerSignature };
};

module.exports = {
  encrypt,
  decrypt,
  generateKeyPair,
  getKeyPair,
  signOffer,
  readKey,
};
