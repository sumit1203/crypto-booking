const BookingPoC = artifacts.require('BookingPoC');


module.exports = function (deployer, network, accounts) {
  console.log('Network:', network);

  const lifTokenAddress = (network == 'mainnent')
    ? '0xeb9951021698b42e4399f9cbb6267aa35f82d59d'
    : '0x5FDFBa355A30FB00ee12965cf3a1c24CA8DF77FB';
  console.log('Accounts:', accounts);
  deployer.deploy(BookingPoC, accounts[0], lifTokenAddress, 7)
  .then(function (bookingContract) {
    console.log('BookingPoC address:', bookingContract.address);
  });
};
