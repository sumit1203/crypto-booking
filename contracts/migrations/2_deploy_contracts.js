const BookingPoC = artifacts.require('BookingPoC');
const LifTokenTest = artifacts.require('LifTokenTest');

module.exports = function (deployer, network, accounts) {
  console.log('Migration on network:', network);
  const bookingEnds = parseInt(new Date(2018,7,6).getTime() / 1000);

  function deployBooking(lifTokenAddress){
    deployer.deploy(BookingPoC, accounts[0], lifTokenAddress, 4, bookingEnds)
    .then(function (bookingContract) {
      console.log('BookingPoC address:', bookingContract.address);
      bookingContract.addRooms('pure-cozy', 5);
      bookingContract.addRooms('white-brown-comfort', 5);
    });
  }

  if (network != 'development') {
    deployBooking((network == 'mainnent')
      ? '0xeb9951021698b42e4399f9cbb6267aa35f82d59d'
      : '0xa63F395D07883239b0709E96c2998e38e68A58ec');
  } else {
    deployer.deploy(LifTokenTest).then(function (lifToken) {
      console.log('LifTokenTest address:', lifToken.address);
      for (let i = 0; i < 10; i++) {
        lifToken.faucetLif({from: accounts[i]});
      };
      deployBooking(lifToken.address);
    });
  }

};
