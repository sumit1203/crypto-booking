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
      from: 1,
      to: 5,
      fullName: null,
      birthDate: null,
      email: '',
      phone: '+',
      instructions: null,
      price: null,
      guestCount: '1',
      errorMessage: '',
      totalDays: Array.from(new Array(5)).map((a, i) => i+1),
    }
  }

  componentDidMount () {
    this.bookingPoC = new this.web3.eth.Contract(BookingPoC.abi, BOOKING_POC_ADDRESS)
    this.computePrice()
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

  onDaysChange = (e) => {
    const day = parseInt(e.target.value)
    const {to, from} = this.state
    let dayFrom = Math.min(from, day)
    let dayTo = Math.max(to, day)

    if(!e.target.checked){
      dayFrom = Math.min(day, 4 /*min from day 9*/)
      dayTo = Math.min(day+1, 5 /*max from day 10*/)
    }
    this.setState({from: dayFrom, to: dayTo}, this.computePrice)
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
    const daysCount = to - from;
    const discount = paymentType === 'lif' ? 0.8 : 1
    const total = price * daysCount * discount
    this.setState({price: total})
  }

  showErrorAlert = () => {
    $('.alert').addClass('show')
    setTimeout(() => {
      $('.alert').removeClass('show')
      this.setState({errorMessage: ''})
    }, 3000)
  }

  onSubmit = async ({guestEthAddress, captchaToken}) => {
    const {from, to, fullName, birthDate, email, phone, guestCount, paymentType} = this.state
    const {id: roomType} = this.props.selectedRoom
    const mappedFromDate = from
    const mappedToDate = to - 1
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
      this.setState({loading: true})
      const response = await (await fetch(SIGNER_API + '/api/booking', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json()

      if (response.status >= 400) {
        console.error(response)
        // HOT FIX to remove blackscreen on error. We should remove bootstrap or use https://react-bootstrap.github.io/
        const modal = document.querySelector('.modal-backdrop')
        if(modal){
          modal.remove()
        }
        this.setState({errorMessage: response.long, loading: false}, this.showErrorAlert)
        return
      }
      const {txs, booking} = response
      this.setState({
        instructions: {txs, booking}
      })
    }catch (e) {
      console.error(e)
    }
    this.setState({loading: false})
  }

  onCloseModal = () => {
    this.setState({isFull: null, instructions: null})
  }

  render () {
    const { errorMessage, from, to, instructions, isFull, price, paymentType, guestCount, email, phone, loading, totalDays} = this.state
    const {selectedRoom, roomTypes} = this.props
    if (isFull) return <FullyBooked onClose={this.onCloseModal}/>
    if (instructions || loading) return <CheckEmail onClose={this.onCloseModal} instructions={instructions} loading={loading}/>
    return (
      <Fragment>
          { errorMessage && (<div className="alert fade fixed-top alert-danger text-center" role="alert">
            <span>{errorMessage}</span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>)}
        <RoomBooking
          from={from}
          to={to}
          roomTypes={roomTypes}
          selectedRoom={selectedRoom}
          price={price}
          email={email}
          phone={phone}
          paymentType={paymentType}
          onPaymentTypeChange={this.onPaymentTypeChange}
          guestCount={guestCount}
          days={totalDays}
          onGuestCountChange={this.onGuestCountChange}
          onRoomTypeChange={this.onRoomTypeChange}
          onFullNameChange={this.onFullNameChange}
          onBirthDateChange={this.onBirthDateChange}
          onEmailChange={this.onEmailChange}
          onPhoneChange={this.onPhoneChange}
          onDaysChange={this.onDaysChange}
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
