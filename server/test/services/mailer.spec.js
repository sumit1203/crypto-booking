/* eslint-env mocha */
require('dotenv').config({ path: './test/utils/.env' });
const { expect } = require('chai');
const {
  sendRawEmail,
  sendConfirmation,
} = require('../../src/services/mail');
const { testHtmlBody } = require('../utils/test-data');

const TO = process.env.MAILGUN_TO_EMAIL;
const FROM = process.env.MAILGUN_FROM_EMAIL;

describe('Mail service', () => {
  xit('Should send an email', async () => {
    try {
      await sendRawEmail(FROM, TO, 'Test email', testHtmlBody('User'));
    } catch (e) {
      expect(false);
    }
  });

  it('Should Throw with invalid from', async () => {
    try {
      await sendRawEmail('wrongFrom', TO, 'Test email', testHtmlBody('User'));
    } catch (e) {
      expect(e).to.have.property('message', '\'from\' parameter is not a valid address. please check documentation');
    }
  });

  it('Should Throw with invalid from', async () => {
    try {
      await sendRawEmail(FROM, 'wrongTo', 'Test email', testHtmlBody('User'));
    } catch (e) {
      expect(e).to.have.property('message', '\'to\' parameter is not a valid address. please check documentation');
    }
  });

  it('Should send a confirmation email', async () => {
    try {
      const data = {
        roomType: 'Room type 1',
        nights: [123, 124],
        room: 2,
        guest: '0x0011..123',
        bookingHash: '0x00980',
      };
      const mailInfo = {
        from: FROM,
        to: TO,
        subject: '[TEST] Confirmation email',
      };
      await sendConfirmation(data, mailInfo);
    } catch (e) {
      expect(false);
    }
  });
});
