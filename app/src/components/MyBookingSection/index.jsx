import React from 'react'
import $ from 'jquery'
import EmailSentModal from './EmailSentModal'
import DeleteInstructionsModal from './DeleteInstructionsModal'
import { SIGNER_API } from '../../config'

export default class MyBookingSection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bookingHash: '',
      bookingIndex: '',
      cancelTx: null
    }
  }

  onHashChange = (e) => {
    this.setState({bookingHash: e.target.value})
  }

  onIndexChange = (e) => {
    this.setState({bookingIndex: e.target.value})
  }

  onSubmit = async (e) => {
    // TODO check this when server can handle this request
    e.preventDefault()
    try {
      const {bookingHash, bookingIndex} = this.state
      const data = {bookingHash, bookingIndex}
      const response = await (await fetch(SIGNER_API + '/booking/emailInfo', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
      if (response.status > 400) {
        console.error(response.code)
        alert(response.long || response.short)
      }
      $('#emailSentModal').modal('show')
    } catch (e) {
      console.error(e)
    }
  }

   onCancel = async() => {
    try {
      const {bookingHash, bookingIndex} = this.state
      const data = {bookingHash, bookingIndex}
      // TODO check this when server can handle this request
      const response = await (await fetch(SIGNER_API + '/booking', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
      if (response.status > 400) {
        console.error(response.code)
        alert(response.long || response.short)
      }
      this.setState({cancelTx: {
        to: response.tx.to,
        data: response.tx.data,
        value: response.tx.value,
        gas: response.tx.gas
      }}, () => $('#deleteInstructionsModal').modal('show'))
    } catch (e) {
      console.error(e)
    }

  }

  render () {
    const {cancelTx} = this.state
    return (
      <article className="py-3 py-md-5 border-bottom" id="my-booking">
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
                  <button className="btn btn-primary btn-lg" type="submit"> Retrieve booking data</button>
                  <br/>
                  <button className="btn btn-link btn-sm text-danger"style={{marginTop: '.5em'}} type="button" onClick={this.onCancel}> Cancel my Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <EmailSentModal/>
        {cancelTx && <DeleteInstructionsModal {...cancelTx}/>}
      </article>
    )
  }
}
