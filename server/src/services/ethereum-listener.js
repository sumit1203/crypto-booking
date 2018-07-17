const Web3 = require('web3');
const BookingPoc = require('../../smart-contracts/build/contracts/BookingPoC.json')

const {
  sendConfirmation,
} = require('./mail.js');

const {
  codeGenerator,
} = require('./secret-codes.js');

const secret = process.env.SECRET;
const web3 = new Web3(process.env.WEB3_PROVIDER);
const bookingPoc = web3.eth.Contract(BookingPoc.t_magic_abi, prcess.env.BOOKING_POC_ADDRESS);

bookingPoc.events.BookingDone()
.on('data', onBookingDoneData);

const onBookingDoneData = ({returnValues, transactionHash}) => {
  const from = process.env.FROM;
  // TODO: We need to read the email from storage ...
  const to = process.env.TO;
  const subject = 'ETHBerlin booking confirmation.';
  const dataString = `${returnValues}${transactionHash}`
  const secretCode = codeGenerator(dataString, secret);
  sendConfirmation({
    ...returnValues,
    transactionHash,
    secretCode
  },
  { from , to, subject });
  // TODO: Add logger here
};
