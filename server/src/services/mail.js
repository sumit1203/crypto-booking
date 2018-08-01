const sgMail = require('@sendgrid/mail');
const {
  confirmationBody,
  instructionsBody,
  bookingChangeBody,
  informationBody,
} = require('./html-generator');
const { handleApplicationError } = require('../errors');
const { getInstructionsTxs } = require('./web3');
const {
  BOOKING_POC_ADDRESS,
  MAIL_API_KEY,
  FROM_EMAIL,
} = require('../config');

sgMail.setApiKey(MAIL_API_KEY);

const sendRawEmail = async (from = FROM_EMAIL, to, subject, html) => {
  try {
    return sgMail.send({ to, from, subject, html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendConfirmation = async (event, secretCode, to) => {
  try {
    const html = confirmationBody(event, secretCode);
    return sgMail.send({ from: FROM_EMAIL, to, subject: 'Hotel confirmation for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendBookingChange = async (event, secretCode, to) => {
  try {
    const html = bookingChangeBody(event, secretCode);
    return sgMail.send({ from: FROM_EMAIL, to, subject: 'Hotel changes for EthBerlin', html });
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

    const txs = getInstructionsTxs(booking.paymentType, signatureData, offerSignature, nights);
    const html = instructionsBody(booking.paymentType, txs);

    return sgMail.send({ from, to, subject, html });
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

    return sgMail.send({ from, to, subject: 'Hotel information for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw handleApplicationError('sendBookingInfoFail', e);
  }
};

module.exports = {
  sendRawEmail,
  sendConfirmation,
  sendInstructions,
  sendBookingChange,
  sendBookingInfo,
};
