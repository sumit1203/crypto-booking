const { bookingPoc } = require('./web3');
const { readBooking, confirmBooking, cancelBooking, updateRoom } = require('../controllers/Booking');
const { sendConfirmation, sendBookingChange } = require('./mail.js');
const { STARTING_BLOCK, BOOKING_STATUS } = require('../config');

let _nextBlockToProcess = STARTING_BLOCK;

async function onBookingDone (args) {
  try {
    const { event, blockNumber, returnValues: { bookingHash, room } } = args;
    const booking = await readBooking({ bookingHash });
    if (!booking) {
      return console.error(`Can not find booking for event: ${event}, blockNumber: ${blockNumber}, logIndex: ${blockNumber}`);
    }
    if (booking.confirmationEmailSent) {
      return;
    }
    const confirmedBooking = await confirmBooking(bookingHash);
    await updateRoom(bookingHash, room);
    await sendConfirmation(event, bookingHash, confirmedBooking.personalInfo.email);
  } catch (e) {
    console.error(e);
  }
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

async function onBookingCancel (args) {
  try {
    const { event, blockNumber, returnValues: { bookingHash } } = args;
    const booking = await readBooking({ bookingHash });
    if (!booking) {
      return console.error(`Can not find booking for event: ${event}, blockNumber: ${blockNumber}, logIndex: ${blockNumber}`);
    }
    if (booking.status === BOOKING_STATUS.canceled) {
      return;
    }
    await cancelBooking(bookingHash);
  } catch (e) {
    console.error(e);
  }
}

const eventTypes = {
  'BookingChanged': onBookingChange,
  'BookingDone': onBookingDone,
  'BookingCanceled': onBookingCancel,
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
