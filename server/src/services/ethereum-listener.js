const Web3 = require('web3');
const BookingPoc = require('../../../smart-contracts/build/contracts/BookingPoC.json');

const {
  sendConfirmation,
} = require('./mail.js');

const {
  codeGenerator,
} = require('./secret-codes.js');

const secret = process.env.SECRET;
const web3 = new Web3(process.env.WEB3_PROVIDER);

const bookingPoc = new web3.eth.Contract(BookingPoc.abi, process.env.BOOKING_POC_ADDRESS);

const onBookingDoneData = async ({ returnValues, transactionHash }) => {
  const from = process.env.MAILGUN_FROM_EMAIL;
  // TODO: We need to read the email from storage ...
  const to = process.env.MAILGUN_TO_EMAIL;
  const subject = 'ETHBerlin booking confirmation.';
  const dataString = `${returnValues}${transactionHash}`;
  const secretCode = codeGenerator(dataString, secret);
  return sendConfirmation({
    ...returnValues,
    transactionHash,
    secretCode: await secretCode,
  },
  { from, to, subject });
  // TODO: Add logger here
};

bookingPoc.events.BookingDone()
  .on('data', onBookingDoneData);

module.exports = {
  onBookingDoneData,
};
