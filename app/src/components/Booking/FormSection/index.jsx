import React, { Fragment } from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import BookingPoC from '../../../abis/BookingPoC.json'
import RoomBooking from './RoomBooking'
import CheckEmail from './CheckEmail'
import FullyBooked from './FullyBooked'
import { WEB3_PROVIDER, BOOKING_POC_ADDRESS, SIGNER_API } from '../../../config'

import { roomType } from '../propTypes'

function _formatDate (date) {
  const d = new Date(date)
  let month = '' + (d.getUTCMonth() + 1)
  let day = '' + d.getUTCDate()
  const year = d.getUTCFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

class FormSection extends React.Component {
  constructor (props) {
    super(props)
    this.web3 = new Web3(WEB3_PROVIDER)
    this.state = {
      paymentType: 'eth',
      from: '2018-09-06',
      to: '',
      fullName: null,
      birthDate: null,
      email: '',
      phone: '+',
      instructions: null,
      toDateMin: '2018-09-07',
      fromDateMax: '2018-09-09',
      price: null,
      guestCount: '1',
      errorMessage: 'asdasdasdasdasd'
    }
  }

  componentDidMount () {
    this.bookingPoC = new this.web3.eth.Contract(BookingPoC.abi, BOOKING_POC_ADDRESS)
  }

  _mapDateToInteger = (date) => {
    return (new Date(date)).getUTCDate() - 5
  }

  _addDay = (date, num) => {
    const fromDate = new Date(date)
    const nextDate = fromDate.setUTCDate(fromDate.getUTCDate() + num)
    return _formatDate(nextDate)
  }

  onPaymentTypeChange = (e) => {
    this.setState({paymentType: e.target.value}, this.computePrice)
  }

  onFromDateChange = (e) => {
    const from = e.target.value
    if (!from) return
    const {to} = this.state
    const fromDate = new Date(from)
    const toDate = new Date(to)
    if (fromDate.getUTCDate() < 6 || fromDate.getUTCDate() >= toDate.getUTCDate()) return
    this.setState({from, toDateMin: this._addDay(from, 1)}, this.computePrice)
  }

  onToDateChange = (e) => {
    const to = e.target.value
    if (!to) return
    const {from} = this.state
    const toDate = new Date(to)
    const fromDate = new Date(from)
    if (toDate.getUTCDate() <= fromDate.getUTCDate() || toDate.getUTCDate() > 10) return
    this.setState({to, fromDateMax: this._addDay(to, -1)}, this.computePrice)
  }
  onFullNameChange = (e) => {
    this.setState({fullName: e.target.value})
  }
  onBirthDateChange = (e) => {
    this.setState({birthDate: e.target.value})
  }
  onEmailChange = (e) => {
    const email = e.target.value
    this.setState({email})
  }
  onPhoneChange = (e) => {
    const phone = e.target.value
    const regexp = /^\+/
    if (!regexp.test(phone)) return
    this.setState({phone})
  }

  onGuestCountChange = (e) => {
    this.setState({guestCount: e.target.value})
  }

  onRoomTypeChange = e => {
    const {onRoomTypeChange, roomTypes} = this.props
    const selectedRoom = roomTypes.find(room => room.id === e.target.value)
    this.computePrice(selectedRoom)
    onRoomTypeChange(selectedRoom)
  }

  computePrice = (roomType = this.props.selectedRoom) => {
    const {from, to, paymentType} = this.state;
    const {price} = roomType;
    if (!from || !to || !price) return
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const daysCount = (new Date (toDate - fromDate)).getDate()
    const discount = paymentType === 'lif' ? 0.8 : 1
    const total = price * daysCount * discount
    this.setState({price: total})
  }

  showErrorAlert = () => {
    $('.alert').addClass('show')
    setTimeout(() => {
      $('.alert').removeClass('show')
    }, 3000)
  }

  onSubmit = async ({guestEthAddress, captchaToken}) => {
    const {from, to, fullName, birthDate, email, phone, guestCount, paymentType} = this.state
    const {id: roomType} = this.props.selectedRoom
    const mappedFromDate = this._mapDateToInteger(from)
    const mappedToDate = this._mapDateToInteger(to) - 1
    const nights = []
    for (let i = mappedFromDate; i <= mappedToDate; i++) {
      nights.push(i)
    }
    const availableRooms = await this.bookingPoC.methods.roomsAvailable(roomType, nights).call()
    if (!availableRooms.some(roomFlag => !!parseInt(roomFlag))) {
      this.setState({isFull: true})
      return
    }
    const data = {
      'g-recaptcha-response': captchaToken,
      paymentType,
      guestCount,
      roomType,
      from: mappedFromDate,
      to: mappedToDate,
      guestEthAddress,
      personalInfo: {fullName, birthDate, phone, email}
    }
    try {
      const response = await (await fetch(SIGNER_API + '/api/booking', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()
      if (response.status >= 400) {
        console.error(response)
        this.setState({errorMessage: response.long}, this.showErrorAlert)
        return
      }
      const {txs, booking} = response
      this.setState({
        instructions: {txs, booking},
      })
    }catch (e) {
      console.error(e)
    }
  }

  onCloseModal = () => {
    this.setState({isFull: null, instructions: null})
  }

  render () {
    const { errorMessage, from, to, instructions, isFull, price, toDateMin, fromDateMax, paymentType, guestCount, email, phone} = this.state
    const {selectedRoom, roomTypes} = this.props
    if (isFull) return <FullyBooked onClose={this.onCloseModal}/>
    if (instructions) return <CheckEmail onClose={this.onCloseModal} instructions={instructions}/>
    return (
      <Fragment>
          <div className="alert fade fixed-top alert-danger text-center" role="alert">
            <span>{errorMessage}</span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <RoomBooking
          from={from}
          to={to}
          roomTypes={roomTypes}
          selectedRoom={selectedRoom}
          toDateMin={toDateMin}
          fromDateMax={fromDateMax}
          price={price}
          email={email}
          phone={phone}
          paymentType={paymentType}
          onPaymentTypeChange={this.onPaymentTypeChange}
          guestCount={guestCount}
          onGuestCountChange={this.onGuestCountChange}
          onRoomTypeChange={this.onRoomTypeChange}
          onFromDateChange={this.onFromDateChange}
          onToDateChange={this.onToDateChange}
          onFullNameChange={this.onFullNameChange}
          onBirthDateChange={this.onBirthDateChange}
          onEmailChange={this.onEmailChange}
          onPhoneChange={this.onPhoneChange}
          onSubmit={this.onSubmit}/>
      </Fragment>
    )
  }
}

FormSection.propTypes = {
  selectedRoom: roomType,
  onRoomTypeChange: PropTypes.func.isRequired,
  roomTypes: PropTypes.arrayOf(roomType).isRequired
}

export default FormSection
