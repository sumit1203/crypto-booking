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
          <p className="mb-1">These are th hotel rules:</p>

          <ul>
            <li>
              <b>Check in time</b>: 12-00
            </li>
            <li>
              <b>Check out time</b>: 11-00
            </li>
            <li>
              <b>Breakfast</b>: included
            </li>
            <li>
              <b>Pets allowed</b>: no
            </li>
            <li>
              <b>Hotel phone</b>: +49 12 3234 654
            </li>
            <li>
              <b>Hotel address</b>: Berlin, strasse ..
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
