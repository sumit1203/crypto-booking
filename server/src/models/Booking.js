const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema({
  publicKey: {
    type: String,
    required: [true, 'noPublicKey'],
  },
  guestEthAddress: {
    type: String,
    required: [true, 'noGuestEthAddress'],
  },
  payment: {
    amount: {
      type: Number,
      validate: {
        validator: function (amount) {
          return amount > 0;
        },
        message: 'minAmount',
      },
      required: [true, 'noPaymentAmount'],
    },
    type: {
      type: String,
      enum: ['eth', 'lif'],
      required: [true, 'noPaymentType'],
    },
    tx: {
      type: String,
      required: [true, 'noPaymentTx'],
    },
  },
  signatureTimestamp: {
    type: Number,
    required: [true, 'noSignatureTimestamp'],
  },
  personalInfo: {
    type: String,
    required: [true, 'noPersonalInfo'],
  },
});

module.exports = { Booking: mongoose.model('Booking', Booking) };
