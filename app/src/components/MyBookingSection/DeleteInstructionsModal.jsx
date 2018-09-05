import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Transaction, { transactionType } from '../Transaction'
import Loader from '../Loader'

const DeleteInstructionsModal = ({tx, loading}) => {
  return (
    <div className="modal" id="deleteInstructionsModal" tabIndex="-2" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {loading || !tx ? <Loader block={200} label="Loading..."/> :
            <Fragment>
              <div className="modal-header">
                <h5 className="modal-title">To cancel your booking</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <i className="mdi mdi-close"/>
                </button>
              </div>

              <div className="modal-body">
                <p className="mb-1">Please make the following transaction.</p>
                <Transaction to={tx.to} gas={tx.gas} data={tx.data} value={tx.value}/>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
              </div>
            </Fragment>
          }
        </div>
      </div>
    </div>
  )
}

DeleteInstructionsModal.propTypes = {
  tx: PropTypes.shape(transactionType),
  loading: PropTypes.bool
}

export default DeleteInstructionsModal