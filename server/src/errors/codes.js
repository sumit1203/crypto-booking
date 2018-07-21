module.exports = {
  genericError: {
    status: 500,
    short: 'Something went wrong.',
    long: 'Something went wrong. Please contact the administrator.',
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
  noGuestAddress: {
    status: 409,
    short: 'No guest address provided.',
    long: 'The field guestAddress is required.',
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
  noPaymentAmount: {
    status: 409,
    short: 'No payment amount provided.',
    long: 'The payment.amount is required.',
  },
  noPaymentType: {
    status: 409,
    short: 'No payment type provided.',
    long: 'The payment.type is required.',
  },
  noPaymentTx: {
    status: 409,
    short: 'No payment tx provided.',
    long: 'The payment.tx is required.',
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
};
