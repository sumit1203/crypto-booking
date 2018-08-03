const { BOOKING_STATUS } = require('../constants');

module.exports = {
  genericError: {
    status: 500,
    short: 'Something went wrong.',
    long: 'Something went wrong. Please contact the administrator.',
  },
  noMasterKey: {
    status: 500,
    short: 'No master key provided',
    long: 'A master key must be setted for encrypt info',
  },
  noBookingHash: {
    status: 500,
    short: 'No booking hash provided',
    long: 'A booking hash must be generated for encrypt/decrypt info',
  },
  noPrivateKey: {
    status: 500,
    short: 'No private key provided',
    long: 'A private key must be provided for encrypt/decrypt info',
  },
  invalidEncryptedPersonalInfo: {
    status: 500,
    short: 'Invalid encrypted personal information.',
    long: 'The encryptedPersonalInfo must be a hex.',
  },
  invalidCryptoPrice: {
    status: 500,
    short: 'Invalid eth price.',
    long: 'The cryptoPrice must be a number.',
  },
  whiteList: {
    status: 403,
    short: 'IP is not whitelisted.',
    long: 'IP must be in the whitelist. Please contact the administrator.',
  },
  rateLimit: {
    status: 429,
    short: 'API rate Limit Exceeded',
    long: 'The rate limit was exceeded. Please try later.',
  },
  noGuestEthAddress: {
    status: 409,
    short: 'No guest Ethereum address provided.',
    long: 'The field guestEthAddress is required.',
  },
  guestEthAddressChecksum: {
    status: 409,
    short: 'Invalid guest Ethereum address.',
    long: 'Guest Ethereum address provided have not passed checksum.',
  },
  minAmount: {
    status: 409,
    short: 'Invalid minimun amount of payment.',
    long: 'The payment amount must be greater than 0.',
  },
  invalidPaymentAmount: {
    status: 409,
    short: 'Invalid format of payment amount provided.',
    long: 'The payment.amount must be a number.',
  },
  noPaymentAmount: {
    status: 409,
    short: 'No payment amount provided.',
    long: 'The paymentAmount is required.',
  },
  noPaymentType: {
    status: 409,
    short: 'No payment type provided.',
    long: 'The paymentType is required.',
  },
  noPaymentTx: {
    status: 409,
    short: 'No payment tx provided.',
    long: 'The paymentTx is required.',
  },
  noSignatureTimestamp: {
    status: 409,
    short: 'No signature timestamp provided.',
    long: 'The signatureTimestamp is required.',
  },
  noPersonalInfo: {
    status: 409,
    short: 'No personal information provided.',
    long: 'The personalInfo is required.',
  },
  invalidPersonalInfo: {
    status: 409,
    short: 'Invalid personal information.',
    long: 'The personalInfo must be an object.',
  },
  invalidPersonalInfoEmail: {
    status: 409,
    short: 'Invalid email in personal information.',
    long: 'The property personalInfo.email must be a valid email.',
  },
  invalidPersonalInfoFullName: {
    status: 409,
    short: 'Invalid full name in personal information.',
    long: 'The property personalInfo.fullName is required.',
  },
  invalidPersonalInfoPhone: {
    status: 409,
    short: 'Invalid phone in personal information.',
    long: 'The property personalInfo.phone is required.',
  },
  invalidPersonalInfoBirthDate: {
    status: 409,
    short: 'Invalid birthDate in personal information.',
    long: 'The property personalInfo.birthdate is required.',
  },
  duplicateBooking: {
    status: 409,
    short: 'Duplicate booking.',
    long: 'Only one booking per guest eth address is allowed.',
  },
  toOutOfRange: {
    status: 409,
    short: 'Property "To" out of range.',
    long: '"To" must be a number between "from" and 4',
  },
  noTo: {
    status: 409,
    short: 'No property "To" provided.',
    long: '"to" is required.',
  },
  fromOutOfRange: {
    status: 409,
    short: 'Property "from" out of range.',
    long: '"from" must be a number between 1 and 4',
  },
  noFrom: {
    status: 409,
    short: 'No property "from" provided.',
    long: '"from" is required.',
  },
  noRoomType: {
    status: 409,
    short: 'No room type provided.',
    long: 'The roomType is required.',
  },
  noStatus: {
    status: 409,
    short: 'No property "status" provided.',
    long: '"status" is required.',
  },
  invalidStatus: {
    status: 409,
    short: 'Invalid property "status" provided.',
    long: `"status" could be ${Object.keys(BOOKING_STATUS).join(', ').toLowerCase()}.`,
  },
  noGuestCount: {
    status: 409,
    short: 'No property "guestCount" provided.',
    long: '"guestCount" is required.',
  },
  guestCountOutOfRange: {
    status: 409,
    short: 'Property "guestCount" out of range.',
    long: '"guestCount" must be a number between 1 and 2',
  },
  noRecaptcha: {
    status: 409,
    short: 'No property "g-recaptcha-response" provided.',
    long: '"g-recaptcha-response" is required.',
  },
  recaptcha: {
    status: 401,
    short: 'Bad recaptcha.',
    long: 'Recaptcha can not be verified.',
  },
};
