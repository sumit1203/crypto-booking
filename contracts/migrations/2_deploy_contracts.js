const BookingPoC = artifacts.require('BookingPoC');
const LifTokenTest = artifacts.require('LifTokenTest');

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    console.log('Migration on network:', network);
    const bookingEnds = parseInt(new Date(2018,8,14).getTime() / 1000);
    let lifTokenAddress;

    if (network == 'mainnet') {
      lifTokenAddress = '0xeb9951021698b42e4399f9cbb6267aa35f82d59d'
    } else if (network == 'ropsten') {
      lifTokenAddress = '0xa63F395D07883239b0709E96c2998e38e68A58ec';
    } else {
      const lifToken = await deployer.deploy(LifTokenTest);
      lifTokenAddress = lifToken.address
      for (let i = 0; i < 10; i++) {
        lifToken.faucetLif({from: accounts[i]});
      };
    }
    
    let bookingContract = await deployer.deploy(BookingPoC, accounts[0], lifTokenAddress, 4, bookingEnds);
    console.log('BookingPoC address:', bookingContract.address);
    await bookingContract.addRooms('pure-cozy', 5);
    await bookingContract.addRooms('white-brown-comfort', 5);
  })

};
