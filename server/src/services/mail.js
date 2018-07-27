const mailgun = require('mailgun-js');
const {
  confirmationBody,
  instructionsBody,
  bookingChangeBody,
  informationBody,
} = require('./html-generator');
const { bookingPoc } = require('./web3');

const mailgunClient = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendRawEmail = async (from = process.env.MAILGUN_FROM_EMAIL, to, subject, html) => {
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
    return mailgunClient.messages().send({ from: process.env.MAILGUN_FROM_EMAIL, to, subject: 'Hotel confirmation for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendBookingChange = async (event, secretCode, to) => {
  try {
    const html = bookingChangeBody(event, secretCode);
    return mailgunClient.messages().send({ from: process.env.MAILGUN_FROM_EMAIL, to, subject: 'Hotel changes for EthBerlin', html });
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

    const html = instructionsBody(booking.paymentAmount, process.env.BOOKING_POC_ADDRESS, txData);
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    console.log(e);
    // TODO: Handle errors
    throw e;
  }
};

const sendBookingInfo = async (booking, { from, to }) => {
  try {
    const { personalInfo, roomType } = booking;
    const nights = [];
    for (let i = booking.from; i <= booking.to; i++) {
      nights.push(i);
    }
    const html = informationBody({ personalInfo, nights, roomType });
  
    return mailgunClient.messages().send({ from, to, subject: 'Hotel information for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

module.exports = {
  sendRawEmail,
  sendConfirmation,
  sendInstructions,
  sendBookingChange,
  sendBookingInfo,
};
