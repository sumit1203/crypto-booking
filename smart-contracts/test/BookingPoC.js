
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
    assert.equal(0, await booking.totalRooms());
    await booking.addRooms(5);
    assert.equal(5, await booking.totalRooms());
  });

  it('Book a room sending Lif', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms(5);
    assert.equal(1, (await booking.roomsAvailable([1, 2, 3]))[0]);
    assert.equal(2, (await booking.roomsAvailable([1, 2, 3]))[1]);
    assert.equal(3, (await booking.roomsAvailable([1, 2, 3]))[2]);
    assert.equal(4, (await booking.roomsAvailable([1, 2, 3]))[3]);
    assert.equal(5, (await booking.roomsAvailable([1, 2, 3]))[4]);

    const offerTimestamp = parseInt(new Date().getTime() / 1000) - 1;
    const lifWeiPerNight = 100;
    const hashedMessage = web3.utils.soliditySha3(
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'lif' });
    const offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await lifToken.approve(booking.address, 300, { from: accounts[3] });

    await booking.bookWithLif(lifWeiPerNight, offerTimestamp, offerSignature, [1, 2, 3], { from: accounts[3] });
    assert.equal(300, await lifToken.balanceOf(accounts[0]));
    assert.equal(false, await booking.roomAvailable([1, 2, 3], 1));
    assert.equal(0, (await booking.roomsAvailable([1, 2, 3]))[0]);
    assert.equal(2, (await booking.roomsAvailable([1, 2, 3]))[1]);
    assert.equal(3, (await booking.roomsAvailable([1, 2, 3]))[2]);
    assert.equal(4, (await booking.roomsAvailable([1, 2, 3]))[3]);
    assert.equal(5, (await booking.roomsAvailable([1, 2, 3]))[4]);
  });

  it('Book a room sending ETH', async function () {
    assert.equal(accounts[1], await booking.offerSigner());
    await booking.addRooms(5);
    assert.equal(true, await booking.roomAvailable([1, 2, 3], 1));
    assert.equal(1, (await booking.roomsAvailable([1, 2, 3]))[0]);
    assert.equal(2, (await booking.roomsAvailable([1, 2, 3]))[1]);
    assert.equal(3, (await booking.roomsAvailable([1, 2, 3]))[2]);
    assert.equal(4, (await booking.roomsAvailable([1, 2, 3]))[3]);
    assert.equal(5, (await booking.roomsAvailable([1, 2, 3]))[4]);

    const offerTimestamp = parseInt(new Date().getTime() / 1000) - 1;
    const lifWeiPerNight = 100;
    const hashedMessage = web3.utils.soliditySha3(
      { type: 'uint256', value: lifWeiPerNight },
      { type: 'uint256', value: offerTimestamp },
      { type: 'string', value: 'eth' });
    const offerSignature = await web3.eth.sign(hashedMessage, accounts[1]);

    await booking.bookWithEth(
      lifWeiPerNight, offerTimestamp, offerSignature, [1, 2, 3],
      { from: accounts[3], value: 300 }
    );

    // TODO: Check eth balance after tx

    assert.equal(false, await booking.roomAvailable([1, 2, 3], 1));
    assert.equal(0, (await booking.roomsAvailable([1, 2, 3]))[0]);
    assert.equal(2, (await booking.roomsAvailable([1, 2, 3]))[1]);
    assert.equal(3, (await booking.roomsAvailable([1, 2, 3]))[2]);
    assert.equal(4, (await booking.roomsAvailable([1, 2, 3]))[3]);
    assert.equal(5, (await booking.roomsAvailable([1, 2, 3]))[4]);
  });
});
