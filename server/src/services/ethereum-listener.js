const { bookingPoc } = require('./web3');
const { readBooking, confirmBooking, confirmationEmailSentBooking, updateRoom } = require('../controllers/Booking');
const { sendConfirmation, sendBookingChange } = require('./mail.js');
const { STARTING_BLOCK } = require('../config');

let _nextBlockToProcess = STARTING_BLOCK;

async function onBookingDone (args) {
  const { event, blockNumber, returnValues: { bookingHash, room } } = args;
  const booking = await readBooking({ bookingHash });
  if (!booking) {
    return console.error(`Can not find booking for event: ${event}, blockNumber: ${blockNumber}, logIndex: ${blockNumber}`);
  }
  if (booking.confirmationEmailSent) {
    return;
  }
  const confirmedBooking = await confirmBooking(booking.id);
  await updateRoom(booking.id, room);
  await sendConfirmation(event, confirmedBooking.bookingHash, confirmedBooking.personalInfo.email);
};

const onBookingChange = async (event) => {
  const booking = await readBooking({ bookingHash: event.returnValues.bookingHash });
  if (!booking) {
    return console.error(`Can not find booking for event: ${event.event}, blockNumber: ${event.blockNumber}, logIndex: ${event.blockNumber}`);
  }
  if (booking.guestEthAddress === event.returnValues.newGuest) {
    return;
  }
  sendBookingChange(event, event.returnValues.bookingHash, booking.personalInfo.email);
  confirmBooking(booking.id);
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
      return console.error(err);
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
