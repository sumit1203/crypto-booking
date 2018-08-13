/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const sgMail = require('@sendgrid/mail');

const sinon = require('sinon');
const { FROM_EMAIL, MAIL_API_KEY } = require('../../src/config');

const {
  sendRawEmail,
  sendConfirmation,
  sendBookingInfo,
  sendBookingChange,
  sendBookingCanceled,
} = require('../../src/services/mail');

const { testHtmlBody, events, toEmail } = require('../utils/test-data');

describe('Mail service', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
    sgMail.setApiKey(MAIL_API_KEY);
  });
  beforeEach(() => {
    sandbox.stub(sgMail, 'send')
      .returns((data, cb) => ({ id: '<Some.id@server>', message: 'Queued. Thank you.' }));
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('Should send an email', async () => {
    await sendRawEmail(FROM_EMAIL, toEmail, 'Test email', testHtmlBody('User'));
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });

  it('Should send a confirmation email', async () => {
    await sendConfirmation(events.BookingDone, 'asd 123 fgh', toEmail);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });

  it('Should send a booking change email', async () => {
    await sendBookingChange(events.BookingChanged, 'asd 123 fgh', toEmail);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });
  it('Should send a booking cancel email', async () => {
    await sendBookingCanceled('some booking hash', toEmail);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });
  it('Should send a booking information email', async () => {
    const data = {
      roomType: 'Room type 1',
      nights: [1, 2],
      personalInfo: {
        email: 'some@email.com',
        fullName: 'Some Fullname',
      },
    };
    const mailInfo = {
      from: FROM_EMAIL,
      to: toEmail,
      subject: '[TEST] information email',
    };
    await sendBookingInfo(data, mailInfo);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });
});
