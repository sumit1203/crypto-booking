const crypto = require('crypto');
const web3 = require('web3');
const bitcoin = require('bitcoinjs-lib');
const { getKeyPair, decrypt } = require('../services/crypto');

const bookings = require('./bookings.json');

function decryptPersonalInfo(booking) {
  const privateKey = getKeyPair(booking.bookingHash, booking.bookingIndex).privateKey;
  const decryptedHexInfo = decrypt(booking.encryptedPersonalInfo, privateKey);
  return web3.utils.hexToString(decryptedHexInfo);
}

for (var i = 0; i < bookings.length; i++) {
  console.log("Booking", bookings[i].bookingIndex, decryptPersonalInfo(bookings[i]));
}
