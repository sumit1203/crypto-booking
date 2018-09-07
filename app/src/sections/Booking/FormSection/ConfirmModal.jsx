import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import ReCAPTCHA from 'react-google-recaptcha'
import {CAPTCHA_SITE_KEY} from '../../../config'

import payment from 'windingtree-media-web/custom-icons/svg/wt-icon--payment.svg'
import BookingContainer from '..'

class ConfirmModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      guestEthAddress: '',
      captchaToken: null
    }
  }

  componentDidMount() {
    BookingContainer.web3.eth.getAccounts().then(accounts => {
      this.setState({guestEthAddress: accounts[0]})
    })
    $('#modalConfirm').modal('show')
    $('#modalConfirm').on('hidden.bs.modal', () => {
      this.props.onClose()
    })
    if (this.reCaptchaRef) this.reCaptchaRef.reset()
  }

  onAddressChange = (e) => {
    this.setState({guestEthAddress: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {guestEthAddress, paymentType, captchaToken} = this.state
    if (!captchaToken) return
    this.props.onSubmit({guestEthAddress, paymentType, captchaToken})
    $('#modalConfirm').modal('hide')
  }

  onCaptchaChange = (value) => {
    this.setState({captchaToken: value})
  }

  setReCaptchaRef = ref => {
    this.reCaptchaRef = ref
  }

  render () {
    const {paymentType, onPaymentTypeChange, price} = this.props
    const {guestEthAddress} = this.state
    return (
      <div className="modal" id="modalConfirm" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.onSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm the reservation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <i className="mdi mdi-close"/>
                </button>
              </div>
              <div className="modal-body">
                <p className="mb-1"> Select your preferred payment method.</p>
                <div className="row mb-1">
                  <div className="col-sm-8">
                    <div className="row no-gutters mb-1">
                      <div className="col-4">
                        <img src={payment} style={{position: 'relative', right: -30}} alt="icon" width="100"
                             className="img-fluid"/>
                      </div>
                      <div className="col-8">
                        <div className="form-check" style={{marginBottom: '0.3em', paddingTop: 7}}>
                          <input className="form-check-input" style={{position: 'relative', top: 2, marginRight: 5}}
                                 type="radio" name="pay-type" id="pay-eth" value="eth" required
                                 onChange={onPaymentTypeChange} checked={paymentType === 'eth'}/>
                          <label className="form-check-label" htmlFor="pay-eth">
                            <b>Ether</b>
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" style={{position: 'relative', top: 2, marginRight: 5}}
                                 type="radio" name="pay-type" id="pay-lif" value="lif" required
                                 onChange={onPaymentTypeChange} checked={paymentType === 'lif'}/>
                          <label className="form-check-label" htmlFor="pay-lif">
                            <b>Lif</b>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div style={{marginTop: -10}}>
                      <p>
                        <small>Final price:</small>
                      </p>
                      <div className="badge badge-light px-1">
                        <span className="h3">$<span className="h2 font--alt">{price}</span></span>.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="mb-1">
                      Provide the address from which you will pay.
                    </p>
                    <div className="mb-1 px-1">
                      <div className="form-group form-row mb-0">
                        <label htmlFor="guestAddress" className="col-md-4 col-lg-3 col-form-label col-form-label-lg">
                          <b>Your Address</b>
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            type="text"
                            value={guestEthAddress}
                            id="guestAddress"
                            autoComplete="off"
                            className="form-control form-control-lg w-100"
                            style={{width: 450}}
                            onChange={this.onAddressChange}
                            placeholder='0xe99356bde974bbe08721d77712168fa070aa8da2'
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ReCAPTCHA ref={this.setReCaptchaRef} sitekey={CAPTCHA_SITE_KEY} theme='light' onChange={this.onCaptchaChange}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ConfirmModal.propTypes = {
  price: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  paymentType: PropTypes.string.isRequired,
  onPaymentTypeChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

}

export default ConfirmModal
