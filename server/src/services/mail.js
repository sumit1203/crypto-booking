const mailgun = require('mailgun-js');

const mailgunClient = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendRawEmail = async (from = process.env.MAILGUN_FROM_EMAIL, to, subject, html) => {
  try {
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  sendRawEmail,
};
