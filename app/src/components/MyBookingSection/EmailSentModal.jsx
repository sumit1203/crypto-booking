import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader'

const EmailSentModal = ({loading}) => (
  <div className="modal" id="emailSentModal" tabIndex="-2" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        {loading ? <Loader block={200} label="Loading..."/> :
          <Fragment>
            <div className="modal-header">
              <h5 className="modal-title">We sent you a message</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="mdi mdi-close"/>
              </button>
            </div>

            <div className="modal-body">
              <p className="mb-1">Please check your email.</p>
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

EmailSentModal.propTypes = {
  loading: PropTypes.bool
}

export default EmailSentModal