const crypto = require('crypto');
const { web3 } = require('./web3');
const {
  OWNER_PRIVATE_KEY,
  OWNER_ADDRESS,
} = require('../config');

const codeGenerator = async (data, secret) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${data} ${secret}`);
  const digest = hmac.digest('base64');
  const code = digest.slice(0, 9);
  return code;
};

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

  web3.eth.accounts.wallet.add(key);
  const accounts = web3.eth.accounts.wallet;
  const offerSignature = await web3.eth.sign(hashedMessage, accounts[0].address);
  web3.eth.accounts.wallet.clear();
  return { signatureData, offerSignature };
};

module.exports = {
  codeGenerator,
  signOffer,
  readKey,
};
