
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const BN = require('bignumber.js');
const {duration, increaseTime} = require('./helpers/increaseTime');

const BookingPoC = artifacts.require('BookingPoC');
const LifToken = artifacts.require('LifToken');

require('chai')
  .use(require('chai-bignumber')(BN))
  .use(require('chai-as-promised'))
  .should();

async function latestTime() {
  return (await web3.eth.getBlock('latest')).timestamp;
};

contract('BookingPoC', function (accounts) {
  let booking, lifToken;

  beforeEach(async function () {
    lifToken = await LifToken.new();
    await lifToken.mint(accounts[3], 1000);
    await lifToken.finishMinting();
    const bookingEnds = await latestTime() + 30;
    booking = await BookingPoC.new(accounts[1], lifToken.address, 7, bookingEnds);
  });

  it('Can change signer and token address', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    assert.equal(lifToken.address, await booking.lifToken());
    await booking.edit(accounts[2], accounts[3]);
    assert.equal(accounts[2], await booking.offerSigner());
    assert.equal(accounts[3], await booking.lifToken());
  });

  it('Add rooms to Booking contract', async function () {
    assert.equal(0, await booking.totalRooms('basic'));
    await booking.addRooms('basic', 5);
    assert.equal(5, await booking.totalRooms('basic'));
  });

  it('Book a room sending Lif', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms('basic', 5);
    assert.equal(true, await booking.roomAvailable('basic', [1, 2, 3], 1));
    let roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(1, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    const offerTimestamp = await latestTime() - 1;
    const lifWeiPerNight = 100;
    const bookingHash = web3.utils.sha3('ABC-123');
    const hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: 'basic' },
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'lif' },
      { type: 'bytes32', value: bookingHash }
    );
    const offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await lifToken.approve(booking.address, 300, { from: accounts[3] });

    assert.equal(0, parseInt(await lifToken.balanceOf(booking.address)));
    await booking.bookWithLif(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[3] }
    );
    assert.equal(300, parseInt(await lifToken.balanceOf(booking.address)));

    const bookingDone = [
      await booking.getBooking('basic', 1, 1),
      await booking.getBooking('basic', 1, 2),
      await booking.getBooking('basic', 1, 3)
    ];
    assert.equal(accounts[3], bookingDone[0][0]);
    assert.equal(accounts[3], bookingDone[1][0]);
    assert.equal(accounts[3], bookingDone[2][0]);
    assert.equal(100, bookingDone[0][1]);
    assert.equal(100, bookingDone[1][1]);
    assert.equal(100, bookingDone[2][1]);
    assert.equal(bookingHash, bookingDone[0][2]);
    assert.equal(bookingHash, bookingDone[1][2]);
    assert.equal(bookingHash, bookingDone[2][2]);
    assert.equal(false, bookingDone[0][3]);
    assert.equal(false, bookingDone[1][3]);
    assert.equal(false, bookingDone[2][3]);

    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 1));
    roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(0, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);
  });

  it('Book a room sending ETH', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms('basic', 5);
    assert.equal(true, await booking.roomAvailable('basic', [1, 2, 3], 1));
    let roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(1, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    const offerTimestamp = await latestTime() - 1;
    const lifWeiPerNight = 100;
    const bookingHash = web3.utils.sha3('ABC-123');
    const hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: 'basic' },
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'eth' },
      { type: 'bytes32', value: bookingHash }
    );
    const offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    const balanceBefore = await web3.eth.getBalance(accounts[0])
    await booking.bookWithEth(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[3], value: 300 }
    );
    assert.equal(parseInt(balanceBefore) + 300, await web3.eth.getBalance(accounts[0]));

    const bookingDone = [
      await booking.getBooking('basic', 1, 1),
      await booking.getBooking('basic', 1, 2),
      await booking.getBooking('basic', 1, 3)
    ];
    assert.equal(accounts[3], bookingDone[0][0]);
    assert.equal(accounts[3], bookingDone[1][0]);
    assert.equal(accounts[3], bookingDone[2][0]);
    assert.equal(100, bookingDone[0][1]);
    assert.equal(100, bookingDone[1][1]);
    assert.equal(100, bookingDone[2][1]);
    assert.equal(bookingHash, bookingDone[0][2]);
    assert.equal(bookingHash, bookingDone[1][2]);
    assert.equal(bookingHash, bookingDone[2][2]);
    assert.equal(true, bookingDone[0][3]);
    assert.equal(true, bookingDone[1][3]);
    assert.equal(true, bookingDone[2][3]);

    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 1));
    roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(0, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);
  });

  it('Book rooms sending ETH and Lif and withdraw funds', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms('basic', 5);
    assert.equal(true, await booking.roomAvailable('basic', [1, 2, 3], 1));
    let roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(1, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    let offerTimestamp = await latestTime() - 1;
    let lifWeiPerNight = 100;
    let bookingHash = web3.utils.sha3('ABC-123');
    let hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: 'basic' },
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'eth' },
      { type: 'bytes32', value: bookingHash }
    );
    let offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await booking.bookWithEth(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[4], value: 300 }
    );

    offerTimestamp = await latestTime() - 1;
    lifWeiPerNight = 100;
    bookingHash = web3.utils.sha3('ABC-1234');
    hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: 'basic' },
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'lif' },
      { type: 'bytes32', value: bookingHash }
    );
    offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await lifToken.approve(booking.address, 300, { from: accounts[3] });

    await booking.bookWithLif(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[3] }
    );

    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 1));
    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 2));
    roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(0, roomsAvailable[0]);
    assert.equal(0, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    await increaseTime(31);
    assert.equal(300, await web3.eth.getBalance(booking.address));
    assert.equal(300, parseInt(await lifToken.balanceOf(booking.address)));
    const balanceBefore = await web3.eth.getBalance(accounts[0])
    await booking.withdraw();
    assert.equal(parseInt(balanceBefore) + 300, await web3.eth.getBalance(accounts[0]));
    assert.equal(300, parseInt(await lifToken.balanceOf(accounts[0])));
  });

  it('Book rooms sending ETH and Lif cancel bookings and withdraw funds', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms('basic', 5);
    await booking.addRefund(15, 2);
    await booking.addRefund(5, 10);

    assert.equal(true, await booking.roomAvailable('basic', [1, 2, 3], 1));
    let roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(1, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    let offerTimestamp = await latestTime() - 1;
    let lifWeiPerNight = 100;
    let bookingHash = web3.utils.sha3('ABC-123');
    let hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: 'basic' },
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'eth' },
      { type: 'bytes32', value: bookingHash }
    );
    let offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await booking.bookWithEth(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[4], value: 300 }
    );

    offerTimestamp = await latestTime() - 1;
    lifWeiPerNight = 100;
    bookingHash = web3.utils.sha3('ABC-1234');
    hashedMessage = web3.utils.soliditySha3(
      { type: 'string', value: 'basic' },
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'lif' },
      { type: 'bytes32', value: bookingHash }
    );
    offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await lifToken.approve(booking.address, 300, { from: accounts[3] });

    await booking.bookWithLif(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[3] }
    );

    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 1));
    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 2));
    roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(0, roomsAvailable[0]);
    assert.equal(0, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    await booking.cancelBooking(
      'basic', [1,2,3], 2, web3.utils.sha3('ABC-1234'), false,
      { from: accounts[3] }
    );
    await increaseTime(16);
    await booking.cancelBooking(
      'basic', [1,2,3], 1, web3.utils.sha3('ABC-123'), true,
      { from: accounts[3] }
    ).should.be.rejectedWith('revert');
    await booking.cancelBooking(
      'basic', [1,2,3], 1, web3.utils.sha3('ABC-123'), true,
      { from: accounts[4] }
    );
    await increaseTime(15);

    assert.equal(270, await web3.eth.getBalance(booking.address));
    assert.equal(150, parseInt(await lifToken.balanceOf(booking.address)));
    const balanceBefore = await web3.eth.getBalance(accounts[0])
    await booking.withdraw();
    assert.equal(parseInt(balanceBefore) + 270, await web3.eth.getBalance(accounts[0]));
    assert.equal(150, parseInt(await lifToken.balanceOf(accounts[0])));
  });

});
