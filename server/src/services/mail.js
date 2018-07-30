const mailgun = require('mailgun-js');
const {
  confirmationBody,
  instructionsBody,
  bookingChangeBody,
} = require('./html-generator');
const { bookingPoc } = require('./web3');
const {
  BOOKING_POC_ADDRESS,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAILGUN_FROM_EMAIL
} = require('../config');

const mailgunClient = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const sendRawEmail = async (from = MAILGUN_FROM_EMAIL, to, subject, html) => {
  try {
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendConfirmation = async (event, secretCode, to) => {
  try {
    const html = confirmationBody(event, secretCode);
    return mailgunClient.messages().send({ from: MAILGUN_FROM_EMAIL, to, subject: 'Hotel confirmation for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendBookingChange = async (event, secretCode, to) => {
  try {
    const html = bookingChangeBody(event, secretCode);
    return mailgunClient.messages().send({ from: MAILGUN_FROM_EMAIL, to, subject: 'Hotel changes for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendInstructions = async ({ booking, offerSignature, signatureData, contractAddress }, { from, to, subject }) => {
  try {
    const nights = [];
    for (let i = booking.from; i <= booking.to; i++) {
      nights.push(i);
    }

    const txData = bookingPoc.methods.bookWithEth(
      signatureData.weiPerNight, signatureData.signatureTimestamp, offerSignature,
      signatureData.roomType, nights, signatureData.bookingHash
    ).encodeABI();

    const html = instructionsBody(booking.paymentAmount, BOOKING_POC_ADDRESS, txData);
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    console.log(e);
    // TODO: Handle errors
    throw e;
  }
};

module.exports = {
  sendRawEmail,
  sendConfirmation,
  sendInstructions,
  sendBookingChange,
};
