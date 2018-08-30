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
    console.error('Error sending confirmation email');
    console.error(e);
    throw e;
  }
};

async function sendBookingCanceled (secretCode, to) {
  try {
    const html = bookingCanceledBody(secretCode);
    return sgMail.send({ from: FROM_EMAIL, to, subject: 'Hotel cancel for EthBerlin', html });
  } catch (e) {
    // TODO: Handle errors
    console.error('Error sending canceled booking email');
    console.error(e);
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
    console.error('Error sending instructions email');
    console.error(e);
    throw e;
  }
};

const sendBookingInfo = async (booking, { from, to }) => {
  try {
    const { personalInfo, roomType, status, fromDate, toDate, remainingMinutes } = booking;

    const html = informationBody({ personalInfo, from: fromDate, to: toDate, roomType, status, remainingMinutes });

    return sgMail.send({ from, to, subject: 'Hotel information for EthBerlin', html });
  } catch (e) {
    console.error('Error sending confirmation email');
    console.error(e);
    throw handleApplicationError('sendBookingInfoFail', e);
  }
};

module.exports = {
  sendConfirmation,
  sendInstructions,
  sendBookingInfo,
  sendBookingCanceled,
};
