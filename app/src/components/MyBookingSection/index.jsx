import React, { Fragment } from 'react'
import $ from 'jquery'
import EmailSentModal from './EmailSentModal'
import DeleteInstructionsModal from './DeleteInstructionsModal'
import ErrorAlert from '../ErrorAlert'
import { SIGNER_API } from '../../config'

export default class MyBookingSection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bookingHash: '',
      bookingIndex: '',
      cancelTx: null,
      isLoading: false
    }
  }

  onHashChange = (e) => {
    this.setState({bookingHash: e.target.value})
  }

  onIndexChange = (e) => {
    this.setState({bookingIndex: e.target.value})
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      const {bookingHash, bookingIndex} = this.state
      const data = {bookingHash, bookingIndex}
      this.setState({isLoading: true})
      $('#emailSentModal').modal('show')
      const response = await (await fetch(SIGNER_API + '/api/booking/emailInfo', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
      this.setState({isLoading: false})
      if (response.status > 400) {
        $('#emailSentModal').modal('hide')
        console.error(response.code)
        this.setState({errorMessage: response.long})
      }
    } catch (e) {
      $('#emailSentModal').modal('hide')
      console.error(e)
    }
  }

   onCancel = async() => {
    try {
      const {bookingHash, bookingIndex} = this.state
      const data = {bookingHash, bookingIndex}
      this.setState({isLoading: true})
      $('#deleteInstructionsModal').modal('show')
      const response = await (await fetch(SIGNER_API + '/api/booking', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
      this.setState({isLoading: false})
      if (response.status >= 400) {
        console.error(response)
        $('#deleteInstructionsModal').modal('hide')
        this.setState({errorMessage: response.long})
        return
      }
      this.setState({cancelTx: {
        to: response.tx.to,
        data: response.tx.data,
        value: response.tx.value,
        gas: response.tx.gas
      }})
    } catch (e) {
      $('#deleteInstructionsModal').modal('hide')
      console.error(e)
    }

  }

  onCloseAlert = () => {
    this.setState({errorMessage: ''})
  }

  render () {
    const {cancelTx, errorMessage, isLoading} = this.state
    return (
      <Fragment>
        {errorMessage && (<ErrorAlert message={errorMessage} onClose={this.onCloseAlert}/>)}
        <article className="py-3 py-md-4 bg-white border-bottom" id="my-booking">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h2 className="mb-1"> My Booking </h2>
                <p className="mb-2"> Please enter the data below. </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group text-left">
                    <label htmlFor="userBookingHash"> <b>Booking hash</b> </label>
                    <input className="form-control form-control-lg mb-2"
                           id="userBookingHash"
                           placeholder="Booking hash"
                           autoComplete="off"
                           onChange={this.onHashChange}
                           type="text"
                           required/>
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="userBookingIndex"> <b>Booking index</b> </label>
                    <input className="form-control form-control-lg mb-2"
                           id="userBookingIndex"
                           placeholder="Booking Index"
                           autoComplete="off"
                           onChange={this.onIndexChange}
                           type="text"
                           required/>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary" type="submit"> Retrieve booking data</button>
                    <br/>
                    <button className="btn btn-link btn-sm text-danger" type="button" onClick={this.onCancel}> Cancel my Booking</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <EmailSentModal loading={isLoading} />
          <DeleteInstructionsModal tx={cancelTx} loading={isLoading}/>
        </article>
      </Fragment>
    )
  }
}
