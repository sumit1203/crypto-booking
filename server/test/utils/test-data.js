const { STARTING_BLOCK } = require('../../src/config');
class ToPlainObjectTestClass {
  constructor () {
    this.name = 'some name';
    this._email = 'some@email.com';
  }
  get email () {
    return this._email;
  }
  save () {
  }
}

const validBooking = {
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  roomType: 'pure-cozy',
  personalInfo: {
    fullName: 'Some name',
    email: 'email@email.com',
    birthDate: '1987-12-17',
    phone: '+420605852377',
  },
  from: 1,
  to: 4,
  guestCount: 1,
};
const validLifBooking = {
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'lif',
  roomType: 'pure-cozy',
  personalInfo: {
    fullName: 'Some name',
    email: 'email@email.com',
    birthDate: '1987-12-17',
    phone: '+420605852377',
  },
  from: 1,
  to: 4,
  guestCount: 1,
};
const validBookingWithEthPrice = {
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  paymentTx: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e234553',
  roomType: 'pure-cozy',
  personalInfo: {
    fullName: 'Some name',
    email: 'email@email.com',
    birthDate: '1987-12-17',
    phone: '+420605852377',
  },
  from: 1,
  to: 4,
  cryptoPrice: 1,
  guestCount: 1,
  roomNumber: 3,
};
const validBookingDB = {
  bookingHash: 'some public key',
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  roomType: 'pure-cozy',
  encryptedPersonalInfo: '0x7b226e616d65223a22536f6d65206e616d65222c22656d61696c223a22656d61696c40656d61696c2e636f6d222c226269727468646179223a2231372f31322f31393837222c2270686f6e65223a222b3131313131313131313131227d',
  from: 1,
  to: 4,
  guestCount: 1,
};

const events = {
  BookingDone: {
    event: 'BookingDone',
    transactionHash: '0x13c30cb0f5bc3d96c70bdced5f55cbe90286a20481d84fe998edd330ffe9893d',
    blockNumber: parseInt(STARTING_BLOCK),
    returnValues: {
      roomType: 'pure-cozy',
      nights: [1, 2, 3, 4],
      room: '1',
      guest: '0x8A14027640DCE9C1DA9395b6D9D0c68c3EA3dF57',
      bookingHash: 'someHash',
    },
  },
  BookingCanceled: {
    event: 'BookingCanceled',
    transactionHash: '0x13c30cb0f5bc3d96c70bdced5f55cbe90286a20481d84fe998edd330ffe9893d',
    blockNumber: parseInt(STARTING_BLOCK) + 5,
    returnValues: {
      roomType: 'pure-cozy',
      nights: [1, 2, 3, 4],
      room: '1',
      guest: '0x8A14027640DCE9C1DA9395b6D9D0c68c3EA3dF57',
      bookingHash: 'someHash',
    },
  },
};

const toEmail = process.env.TO_EMAIL || 'example@windingtree.com';

const testPrivateKey = '0xc9803c313dda9f39b7733dc845bc9b93788f8bbb4f9dbe0d4c2657634f966154';

const instructionsData = {
  txs: [{
    to: '0xA83f78A5b3490b9D6A45B6ada3fF31FAf752566D',
    data: '0x5245A',
    value: '2386078202863535600',
    gas: 1000000,
  }],
  booking: {
    confirmationEmailSent: false,
    status: 'pending',
    roomNumber: null,
    guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
    paymentAmount: 596519550715883900,
    paymentType: 'eth',
    roomType: 'pure-cozy',
    from: 1,
    to: 4,
    guestCount: 1,
    bookingHash: '0x1ab512eb0d6ba16d0aa20b616b257a3c55b5a395e80d0fcbf5963ac694d5b309',
    signatureTimestamp: 1534332702,
    changesEmailSent: 1534334502.715,
    encryptedPersonalInfo: 'b3090912c53d480d94103d7d178858eaeec23973f89d099eef7bf6933530983f5f0e7f8986d314331daaed4a9661b4fbeac0d04b8d90b478f8155a8ea1eee56efbaaed162bf33b6a91e5588482720f297d313482c0724e4d9cbf3b8a042e12df32c9be298dd2f038d52f357633e916cf8f0d6c796c74e672c9a7bda50b3bc827426e973475c9f2683b7525775f1f5c2b217ca29e33282be30da92b2eeddfa2babc35647bb4feb11f734eb1b71bf5b3b5626e18f70206a7a94855c2ce469911664fe9c362597d0320a2f519ae9512898a',
    bookingIndex: 0,
    __v: 0,
    personalInfo:
      { fullName: 'Some name',
        email: 'email@email.com',
        birthDate: '1987-12-17',
        phone: '+420605852377' },
    fromDate: '6/9/2018',
    toDate: '10/9/2018',
    remaindingMinues: 30,
    weiPerNight: '596519550715883900' },
  offerSignature: '0x90ed0690290346a82a82fd33b6cf40f61cf2357a671bceb705392592c81625e07125e1ad34037ab5bf221a6bd129c27ce4e8d860c6e408ffd5adaea774a387b91b',
  signatureData:
   { roomType: 'pure-cozy',
     weiPerNight: '596519550715883900',
     signatureTimestamp: 1534332702,
     paymentType: 'eth',
     bookingHash: '0x1ab512eb0d6ba16d0aa20b616b257a3c55b5a395e80d0fcbf5963ac694d5b309' },
  contractAddress: '0xA83f78A5b3490b9D6A45B6ada3fF31FAf752566D',
  bookingIndex: 0,
  nights: [ 1, 2, 3, 4 ],
};

module.exports = {
  validBooking,
  validLifBooking,
  validBookingDB,
  validBookingWithEthPrice,
  ToPlainObjectTestClass,
  events,
  toEmail,
  testPrivateKey,
  instructionsData,
};
