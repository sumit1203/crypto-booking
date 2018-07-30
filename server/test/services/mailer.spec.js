/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const mailgun = require('mailgun-js');
const sinon = require('sinon');
const { MAILGUN_TO_EMAIL, MAILGUN_FROM_EMAIL } = require('../../src/config');

const {
  sendRawEmail,
  sendConfirmation,
  sendBookingInfo,
  sendBookingChange,
} = require('../../src/services/mail');

const { testHtmlBody, events } = require('../utils/test-data');

describe('Mail service', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.stub(mailgun({ apiKey: 'foo', domain: 'bar' }).Mailgun.prototype, 'messages')
      .returns({
        send: (data, cb) => ({ id: '<Some.id@server>', message: 'Queued. Thank you.' }),
      });
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('Should send an email', async () => {
    await sendRawEmail(MAILGUN_FROM_EMAIL, MAILGUN_TO_EMAIL, 'Test email', testHtmlBody('User'));
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });

  it('Should send a confirmation email', async () => {
    await sendConfirmation(events.BookingDone, 'asd 123 fgh');
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });

  it('Should send a booking change email', async () => {
    await sendBookingChange(events.BookingChanged, 'asd 123 fgh');
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });
  xit('Should send a booking information email', async () => {
    try {
      const data = {
        roomType: 'Room type 1',
        nights: [1, 2],
        personalInfo: {
          email: 'some@email.com',
          fullName: 'Some Fullname',
        },
      };
      const mailInfo = {
        from: MAILGUN_FROM_EMAIL,
        to: MAILGUN_TO_EMAIL,
        subject: '[TEST] information email',
      };
      await sendBookingInfo(data, mailInfo);
    } catch (e) {
      expect(false);
    }
  });
});
