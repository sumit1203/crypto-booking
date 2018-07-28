import React from 'react';

const CheckEmail = ({paymentAmount, contract, offerSignature}) => (
  <div className="modal" id="modalMessage2" tabIndex="-2" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Please, check your email</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="mdi mdi-close"/>
          </button>
        </div>
        <div className="modal-body">
          <p className="mb-1">We sent the payment instructions to your email address.</p>
          <h5 className="mb-1">Make sure you see this ETH address in the email from us!</h5>
          <h5 className="mb-1">Please, send {paymentAmount} Eth to {contract}, with this data:</h5>
          <p className="badge badge-info p-1 w-100">
            <span className="h4 lead text-white">{offerSignature}</span>
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">Ok</button>
        </div>
      </div>
    </div>
  </div>
);


export default CheckEmail;
