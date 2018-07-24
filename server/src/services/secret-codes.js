const crypto = require('crypto');
const Web3 = require('web3');
const web3 = new Web3(process.env.WEB3_PROVIDER);

const codeGenerator = async (data, secret) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${data} ${secret}`);
  const digest = hmac.digest('base64');
  const code = digest.slice(0,9);
  return code;
}

const readKey = async () => {
  // TODO: Store encrypted
  const key = {
    privateKey: process.env.OWNER_PRIVATE_KEY,
    address: process.env.OWNER_ADDRESS,
  }
  return  key;
}

const signOffer = async (booking, key) => {
    const randomCode = Math.floor((1 + Math.random()) * 10000);
    const bookingHash = web3.utils.sha3(`${randomCode}${Date.now()}`);

    const signatureData = {
      roomType: booking.roomType,
      weiPerNight: booking.weiPerNight,
      signatureTimestamp:booking._signatureTimestamp,
      paymentType: booking._payment.type,
      bookingHash: bookingHash
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
    return { signatureData, offerSignature, bookingHash };
}

module.exports = {
  codeGenerator,
  signOffer,
  readKey,
};
