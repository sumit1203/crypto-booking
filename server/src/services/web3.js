const Web3 = require('web3');
const {
  LIF_TOKEN_ADDRESS,
  BOOKING_POC_ADDRESS,
  WEB3_PROVIDER,
} = require('../config');

const web3 = new Web3(WEB3_PROVIDER);

const BookingPoc = require('../public/BookingPoC.json');
const bookingPoc = new web3.eth.Contract(BookingPoc.abi, BOOKING_POC_ADDRESS);

const lifToken = new web3.eth.Contract(
  [{ 'constant': true, 'inputs': [], 'name': 'mintingFinished', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_spender', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }], 'name': 'approve', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'totalSupply', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_from', 'type': 'address' }, { 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }], 'name': 'transferFrom', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'DECIMALS', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'unpause', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_to', 'type': 'address' }, { 'name': '_amount', 'type': 'uint256' }], 'name': 'mint', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_value', 'type': 'uint256' }], 'name': 'burn', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'paused', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_spender', 'type': 'address' }, { 'name': '_subtractedValue', 'type': 'uint256' }], 'name': 'decreaseApproval', 'outputs': [{ 'name': 'success', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'spender', 'type': 'address' }, { 'name': 'value', 'type': 'uint256' }, { 'name': 'data', 'type': 'bytes' }], 'name': 'approveData', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '_owner', 'type': 'address' }], 'name': 'balanceOf', 'outputs': [{ 'name': 'balance', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'finishMinting', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'pause', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'NAME', 'outputs': [{ 'name': '', 'type': 'string' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }], 'name': 'transfer', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'to', 'type': 'address' }, { 'name': 'value', 'type': 'uint256' }, { 'name': 'data', 'type': 'bytes' }], 'name': 'transferData', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_spender', 'type': 'address' }, { 'name': '_addedValue', 'type': 'uint256' }], 'name': 'increaseApproval', 'outputs': [{ 'name': 'success', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '_owner', 'type': 'address' }, { 'name': '_spender', 'type': 'address' }], 'name': 'allowance', 'outputs': [{ 'name': 'remaining', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'from', 'type': 'address' }, { 'name': 'to', 'type': 'address' }, { 'name': 'value', 'type': 'uint256' }, { 'name': 'data', 'type': 'bytes' }], 'name': 'transferDataFrom', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'newOwner', 'type': 'address' }], 'name': 'transferOwnership', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'SYMBOL', 'outputs': [{ 'name': '', 'type': 'string' }], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'burner', 'type': 'address' }, { 'indexed': false, 'name': 'value', 'type': 'uint256' }], 'name': 'Burn', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'Pause', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'Unpause', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': false, 'name': 'amount', 'type': 'uint256' }], 'name': 'Mint', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'MintFinished', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'previousOwner', 'type': 'address' }, { 'indexed': true, 'name': 'newOwner', 'type': 'address' }], 'name': 'OwnershipTransferred', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'owner', 'type': 'address' }, { 'indexed': true, 'name': 'spender', 'type': 'address' }, { 'indexed': false, 'name': 'value', 'type': 'uint256' }], 'name': 'Approval', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'from', 'type': 'address' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': false, 'name': 'value', 'type': 'uint256' }], 'name': 'Transfer', 'type': 'event' }]
  , LIF_TOKEN_ADDRESS);

const getInstructionsTxs = async (paymentType, signatureData, offerSignature, nights) => {
  var txs = [];
  const totalNights = new web3.utils.BN(nights.length);
  const totalWei = (new web3.utils.BN(signatureData.weiPerNight)).mul(totalNights).toString();
  let bookWith = bookingPoc.methods.bookWithEth;
  if (paymentType === 'lif') {
    txs.push({
      to: LIF_TOKEN_ADDRESS,
      data: lifToken.methods.approve(
        BOOKING_POC_ADDRESS, totalWei
      ).encodeABI(),
      value: 0,
      gas: 100000, // await lifToken.methods.approve( BOOKING_POC_ADDRESS, totalWei).estimateGas(),
    });
    bookWith = bookingPoc.methods.bookWithLif;
  }
  txs.push({
    to: BOOKING_POC_ADDRESS,
    data: bookWith(
      signatureData.weiPerNight, signatureData.signatureTimestamp, offerSignature,
      signatureData.roomType, nights, signatureData.bookingHash
    ).encodeABI(),
    value: (paymentType === 'eth') ? totalWei : 0,
    gas: 100000,
    // gas: await bookingPoc.methods.bookWith(
    //   signatureData.weiPerNight, signatureData.signatureTimestamp, offerSignature,
    //   signatureData.roomType, nights, signatureData.bookingHash
    // ).estimateGas(),
  });

  return txs;
};

module.exports = {
  web3,
  bookingPoc,
  getInstructionsTxs,
};
