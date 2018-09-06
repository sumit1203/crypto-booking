import React from 'react'

const CancellationPolicyModal = () => (
  <div className="modal" id="modalCancellationPolicy" tabIndex="-2" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Hotel cancellation & refund policy</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="mdi mdi-close"/>
          </button>
        </div>

        <div className="modal-body">
          <p className="mb-1">Please note the cancellation policy before committing to a reservation.</p>

          <ul>
            <li>
              <b>Booking canceled a week before:</b> 50% refund.
            </li>
            <li>
              <b>Booking canceled a day before:</b> 25% refund.
            </li>
            <li>
              <b>Booking canceled in the last 24 hours:</b> 10% refund.
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">Accept</button>
        </div>
      </div>
    </div>
  </div>
)

export default CancellationPolicyModal
