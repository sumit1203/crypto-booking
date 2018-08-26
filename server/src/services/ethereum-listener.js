const { bookingPoc } = require('./web3');
const { readBooking, confirmBooking, cancelBooking, updateRoom } = require('./booking');
const { sendConfirmation } = require('./mail.js');
const { STARTING_BLOCK } = require('../config');
const { BOOKING_STATUS } = require('../constants');

const options = {
  fromBlock: parseInt(STARTING_BLOCK),
  toBlock: 'latest',
};

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
    await sendConfirmation(args, bookingHash, confirmedBooking.personalInfo.email);
  } catch (e) {
    console.error(e);
  }
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
  'BookingDone': onBookingDone,
  'BookingCanceled': onBookingCancel,
};

const _eventDispatcher = (err, events) => {
  const startingBlock = options.fromBlock;
  console.log(`${events.length} events since block ${startingBlock}`);
  if (err) {
    return console.error(err);
  }
  events.forEach((event) => {
    if (eventTypes[event.event]) {
      eventTypes[event.event](event);
    }
    options.fromBlock = event.blockNumber + 1;
  });
  return { startingBlock, nextBlock: options.fromBlock };
};

const checkEtherumUpdates = () => {
  bookingPoc.getPastEvents('allEvents', options, _eventDispatcher);
};

module.exports = {
  checkEtherumUpdates,
  onBookingDone,
  onBookingCancel,
  _eventDispatcher,
};
