import React from 'react'
import { SIGNER_API } from '../../config'

export default class MyBookingSection extends React.Component {

  onChange = (e) => {
    this.setState({bookingHash: e.target.value})
  }

  onSubmit = async (e) => {
    // TODO check this when server can handle this request
    e.preventDefault()
    try {
      const {bookingHash} = this.state
      const data = {bookingHash}
      const response = await fetch(SIGNER_API + '/booking/emailInfo', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status > 400) console.error(response.statusText || response.status)
    } catch (e) {
      console.error(e)
    }
  }

  render () {
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
                         onChange={this.onChange}
                         type="text"
                         required/>
                </div>
                <button className="btn btn-primary btn-lg" type="submit"> Retrieve booking data</button>
              </form>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
