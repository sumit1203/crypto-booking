const Web3 = require('web3');
const web3 = new Web3(process.env.WEB3_PROVIDER);

const BookingPoc = require('../public/BookingPoC.json');
const bookingPoc = new web3.eth.Contract(BookingPoc.abi, process.env.BOOKING_POC_ADDRESS);

module.exports = {
  web3,
  bookingPoc,
};
