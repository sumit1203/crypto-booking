/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const path = require('path');
require('dotenv').config({ path: path.resolve('../.env.test') });
const { expect } = require('chai');
const { onBookingDone, onBookingCancel, _eventDispatcher } = require('../../src/services/ethereum-listener');
const { events } = require('../utils/test-data');

describe('ethereum listener services', () => {
  it('Should not thorw BookingDone event', () => {
    onBookingDone(events.BookingDone);
  });
  it('Should not thorw BookingCancel event', () => {
    onBookingCancel(events.BookingCanceled);
  });
  it('Should dipatch events', () => {
    const ethEvents = [events.BookingDone, events.BookingCanceled];
    const { startingBlock, nextBlock } = _eventDispatcher(null, ethEvents); // First param is err
    expect(startingBlock).to.be.eql(events.BookingDone.blockNumber);
    expect(nextBlock).to.be.eql(events.BookingCanceled.blockNumber + 1);
  });
});
