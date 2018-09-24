/* eslint-env mocha */
const path = require('path');
require('dotenv').config({ path: path.resolve('../.env.test') });
const { expect } = require('chai');
const sgMail = require('@sendgrid/mail');
const sinon = require('sinon');
const { FROM_EMAIL, MAIL_API_KEY } = require('../../src/config');
const { sendConfirmation, sendBookingInfo, sendBookingCanceled, sendInstructions } = require('../../src/services/mail');
const { events, toEmail, instructionsData } = require('../utils/test-data');

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
  it('Should send instructions email for ETH (1 tx)', async () => {
    await sendInstructions(instructionsData, toEmail);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });
  it('Should send instructions email for LÍF (2 txs)', async () => {
    instructionsData.txs.push(instructionsData.txs[0]);
    instructionsData.booking.paymentType = 'lif';
    await sendInstructions(instructionsData, toEmail);
    const sendFake = sandbox.getFakes()[0];
    expect(sendFake).to.have.property('calledOnce', true);
  });

  it('Should send a confirmation email', async () => {
    await sendConfirmation(events.BookingDone, 'asd 123 fgh', toEmail);
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
