module.exports = {
  genericError: {
    status: 500,
    short: 'Something went wrong.',
    long: 'Something went wrong. Please contact the administrator.',
  },
  invalidEncryptedPersonalInfo: {
    status: 500,
    short: 'Invalid encrypted personal information.',
    long: 'The encryptedPersonalInfo must be a hex.',
  },
  invalidEthPrice: {
    status: 500,
    short: 'Invalid eth price.',
    long: 'The ethPrice must be a number.',
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
  noPublicKey: {
    status: 409,
    short: 'No public key provided.',
    long: 'The field publicKey is required.',
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
    short: 'No propery "To" provided.',
    long: '"to" is required.',
  },
  fromOutOfRange: {
    status: 409,
    short: 'Property "from" out of range.',
    long: '"from" must be a number between 1 and 4',
  },
  noFrom: {
    status: 409,
    short: 'No propery "from" provided.',
    long: '"from" is required.',
  },
  noRoomType: {
    status: 409,
    short: 'No room type provided.',
    long: 'The roomType is required.',
  },
};
