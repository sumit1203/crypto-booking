
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const BookingPoC = artifacts.require('BookingPoC');
const LifToken = artifacts.require('LifToken');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('BookingPoC', function (accounts) {
  let booking, lifToken;

  beforeEach(async function () {
    lifToken = await LifToken.new();
    await lifToken.mint(accounts[3], 1000);
    await lifToken.finishMinting();
    booking = await BookingPoC.new(accounts[1], lifToken.address, 7);
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

    const offerTimestamp = parseInt(new Date().getTime() / 1000) - 1;
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

    await booking.bookWithLif(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[3] }
    );
    assert.equal(300, await lifToken.balanceOf(accounts[0]));
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

    const offerTimestamp = parseInt(new Date().getTime() / 1000) - 1;
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

    await booking.bookWithEth(
      lifWeiPerNight, offerTimestamp, offerSignature,
      'basic', [1, 2, 3], bookingHash,
      { from: accounts[3], value: 300 }
    );

    // TODO: Check eth balance after tx

    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 1));
    roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(0, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);
  });

  it('Book rooms sending ETH and Lif', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms('basic', 5);
    assert.equal(true, await booking.roomAvailable('basic', [1, 2, 3], 1));
    let roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(1, roomsAvailable[0]);
    assert.equal(2, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);

    let offerTimestamp = parseInt(new Date().getTime() / 1000) - 1;
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
      { from: accounts[3], value: 300 }
    );

    offerTimestamp = parseInt(new Date().getTime() / 1000) - 1;
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

    // TODO: Check eth balance after tx

    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 1));
    assert.equal(false, await booking.roomAvailable('basic', [1, 2, 3], 2));
    roomsAvailable = await booking.roomsAvailable('basic', [1, 2, 3]);
    assert.equal(0, roomsAvailable[0]);
    assert.equal(0, roomsAvailable[1]);
    assert.equal(3, roomsAvailable[2]);
    assert.equal(4, roomsAvailable[3]);
    assert.equal(5, roomsAvailable[4]);
  });

});
