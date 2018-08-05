import React from 'react'
import Transaction, {transactionType} from '../Transaction'

const DeleteInstructionsModal = ({to, gas, data, value}) => (
  <div className="modal" id="deleteInstructionsModal" tabIndex="-2" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">To cancel your booking</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="mdi mdi-close"/>
          </button>
        </div>

        <div className="modal-body">
          <p className="mb-1">Please make the following transaction.</p>
          <Transaction to={to} gas={gas} data={data} value={value}/>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
)

DeleteInstructionsModal.propTypes = transactionType

export default DeleteInstructionsModal