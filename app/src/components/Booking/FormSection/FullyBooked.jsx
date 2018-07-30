import React from 'react'
import $ from 'jquery'

class FullyBooked extends React.Component {
  componentDidMount() {
    $('#fullyBooked').modal('show')
  }
  render() {
    return (
      <div className="modal" id="fullyBooked" tabIndex="-2" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Sorry, we are fully booked</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="mdi mdi-close"/>
              </button>
            </div>

            <div className="modal-body">
              <p className="mb-1">There are no more rooms available.</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FullyBooked