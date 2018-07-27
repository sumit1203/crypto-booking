import React from 'react';

const CheckEmail = ({paymentAmount, contract, offerSignature}) => (
  <div className="container">
      Please, send <b>{paymentAmount}</b> Eth to <b>{contract}</b>, with this data: <b>{offerSignature}</b>
  </div>
);


export default CheckEmail;
