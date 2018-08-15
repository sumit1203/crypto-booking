const sgMail = require('@sendgrid/mail');
const {
  confirmationBody,
  instructionsBody,
  informationBody,
  bookingCanceledBody,
} = require('./html-generator');
const { handleApplicationError } = require('../errors');
const {
  MAIL_API_KEY,
  FROM_EMAIL,
} = require('../config');

sgMail.setApiKey(MAIL_API_KEY);

const sendConfirmation = async (event, secretCode, to) => {
  try {
    const html = confirmationBody(event, secretCode);
    return sgMail.send({ from: FROM_EMAIL, to, subject: 'Hotel confirmation for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

async function sendBookingCanceled (secretCode, to) {
  try {
    const html = bookingCanceledBody(secretCode);
    return sgMail.send({ from: FROM_EMAIL, to, subject: 'Hotel cancel for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
}

const sendInstructions = async ({ txs, booking, offerSignature, signatureData, contractAddress, bookingIndex, nights }, to) => {
  try {
    const html = instructionsBody(booking.paymentType, txs, booking.bookingHash, bookingIndex);
    return sgMail.send({ from: FROM_EMAIL, to, subject: 'Hotel reservation instructions', html });
  } catch (e) {
    console.log(e);
    // TODO: Handle errors
    throw e;
  }
};

const sendBookingInfo = async (booking, { from, to }) => {
  try {
    const { personalInfo, roomType, status, fromDate, toDate, remaindingMinues } = booking;

    const html = informationBody({ personalInfo, from: fromDate, to: toDate, roomType, status, remaindingMinues });

    return sgMail.send({ from, to, subject: 'Hotel information for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    throw handleApplicationError('sendBookingInfoFail', e);
  }
};

module.exports = {
  sendConfirmation,
  sendInstructions,
  sendBookingInfo,
  sendBookingCanceled,
};
