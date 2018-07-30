const Web3 = require('web3');
const {
  BOOKING_POC_ADDRESS,
  WEB3_PROVIDER,
} = require('../config');

const web3 = new Web3(WEB3_PROVIDER);

const BookingPoc = require('../public/BookingPoC.json');
const bookingPoc = new web3.eth.Contract(BookingPoc.abi, BOOKING_POC_ADDRESS);

module.exports = {
  web3,
  bookingPoc,
};
