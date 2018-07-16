/* eslint-env mocha */
require('dotenv').config({path: './test/utils/.env'});
const { expect } = require('chai');
const { sendRawEmail } = require('../../src/services/mail');
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
});
