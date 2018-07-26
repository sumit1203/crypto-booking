const { bookingPoc } = require('./web3');
const { readBooking, changesEmailSentBooking, confirmationEmailSentBooking } = require('../controllers/Booking');
const { sendConfirmation } = require('./mail.js');
const { codeGenerator } = require('./secret-codes.js');

let _nextBlockToProcess = process.env.STARTING_BLOCK;

const onBookingDone = async (event) => {
  const booking = readBooking({ bookingHash: event.returnValues.bookingHash });
  if (booking.confirmationEmailSent) {
    return;
  }
  sendConfirmation(event, await codeGenerator(event), booking.personalInfo.email);
  confirmationEmailSentBooking(booking.id);
};

const onBookingChange = async (event) => {
  const booking = readBooking({ bookingHash: event.returnValues.bookingHash });
  if (booking.lastChange) {
    return;
  }
  sendConfirmation(event, await codeGenerator(event), booking.personalInfo.email);
  changesEmailSentBooking(booking.id);
};

const eventTypes = {
  'BookingChanged': onBookingChange,
  'BookingDone': onBookingDone,
};

const checkEtherumUpdates = () => {
  const options = {
    fromBlock: _nextBlockToProcess,
    toBlock: 'latest',
  };

  bookingPoc.getPastEvents('allEvents', options, (err, events) => {
    if (err) {
      return console.log(err);
    }
    events.forEach((event) => {
      if (eventTypes[event.event]) {
        eventTypes[event.event](event);
      }
      _nextBlockToProcess = event.blockNumber + 1;
    });
  });
};

module.exports = {
  checkEtherumUpdates,
};
