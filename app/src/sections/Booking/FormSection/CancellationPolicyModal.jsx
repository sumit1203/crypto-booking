import React from 'react';

const CancellationPolicyModal = () => (
  <div className="modal" id="modalCancellationPolicy" tabIndex="-2" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Hotel cancellation & refund policy
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="mdi mdi-close" />
          </button>
        </div>

        <div className="modal-body">
          <p className="mb-1">
            Please note the cancellation policy before committing to a reservation.
          </p>

          <ul>
            <li className="mb-1">
              Any cancellation more than a 7 days prior to checkin date will be refunded
              by 50% of the price of booking.
            </li>
            <li className="mb-1">
              Any cancellation between a 7 and 1 day before checking date will be refunded
              by 25% of the price of booking.
            </li>
            <li className="mb-1">
              Any cancellation less than 1 day before checking will be refunded
              by 10% of the price of booking. Cancellation past the booking time is not possible.
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CancellationPolicyModal;
