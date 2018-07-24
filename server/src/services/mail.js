const mailgun = require('mailgun-js');
const {
  confirmationBody,
  instructionsBody,
} = require('./html-generator');
const BookingPoC = require('../../../smart-contracts/build/contracts/BookingPoC.json')
const Web3 = require('web3');

 const web3 = new Web3(process.env.WEB3_PROVIDER);
const mailgunClient = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendRawEmail = async (from = process.env.MAILGUN_FROM_EMAIL, to, subject, html) => {
  try {
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendConfirmation = async (data, { from , to, subject }) => {
  try {
    const html = confirmationBody(data)
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendInstructions = async ({ booking, offerSignature, signatureData, contractAddress }, { from , to, subject }) => {
  try {
    const bookingPoC = new web3.eth.Contract(BookingPoC.abi, process.env.BOOKING_POC_ADDRESS);
    const txData = bookingPoC.methods.bookWithEth(
      signatureData.weiPerNight, signatureData.signatureTimestamp, offerSignature,
      signatureData.roomType, [1,2,3,4], signatureData.bookingHash
    ).encodeABI();

    const html = instructionsBody(booking.paymentAmount, process.env.BOOKING_POC_ADDRESS ,txData);
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    console.log(e)
    // TODO: Handle errors
    throw e;
  }
};

module.exports = {
  sendRawEmail,
  sendConfirmation,
  sendInstructions,
};
