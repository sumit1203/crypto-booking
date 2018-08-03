import React from 'react'

const RulesModal = () => (
  <div className="modal" id="modalRules" tabIndex="-2" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Hotel i<span className="font--alt">·31</span></h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="mdi mdi-close"/>
          </button>
        </div>

        <div className="modal-body">
          <p className="mb-1">By booking you agree to the following terms and conditions:</p>

          <ul>
            <li>
              <b>Check in time</b>: 10am
            </li>
            <li>
              <b>Check out time</b>: 11am
            </li>
            <li>
              <b>Breakfast</b>: not included
            </li>
            <li>
              <b>No Smoking</b>
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

export default RulesModal
