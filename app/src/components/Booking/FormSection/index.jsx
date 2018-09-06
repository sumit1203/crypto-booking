import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Web3 from 'web3'
import $ from 'jquery'
import { WEB3_PROVIDER, BOOKING_POC_ADDRESS, SIGNER_API } from '../../../config'
import BookingPoC from '../../../abis/BookingPoC.json'
import RoomBooking from './RoomBooking'
import CheckEmail from './CheckEmail'
import FullyBooked from './FullyBooked'
import ErrorAlert from '../../ErrorAlert'

import { roomType } from '../propTypes'
import BookingContainer from '../index'

class FormSection extends React.Component {
  constructor (props) {
    super(props)
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
      totalDays: [1,2,3,4,5]
    }
  }

  componentDidMount () {
    this.bookingPoC = new BookingContainer.web3.eth.Contract(BookingPoC.abi, BOOKING_POC_ADDRESS)
    this.computePrice()
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
    const {ethPrice, lifPrice} = roomType;
    if (!from || !to) return
    const daysCount = to - from;
    const price = paymentType === 'lif' ? lifPrice : ethPrice
    const total = price * daysCount
    this.setState({price: total})
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
        $('#checkEmail').modal('hide')
        this.setState({errorMessage: response.long, loading: false})
        return
      }
      const {txs, booking} = response
      const txsWithFrom = txs.map(tx => ({from: booking.guestEthAddress, ...tx}))
      this.setState({
        instructions: {txs: txsWithFrom, booking}
      })
    }catch (e) {
      console.error(e)
    }
    this.setState({loading: false})
  }

  onCloseModal = () => {
    this.setState({isFull: null, instructions: null})
  }

  onCloseErrorAlert = () => {
    this.setState({errorMessage: ''})
  }

  render () {
    const { errorMessage, from, to, instructions, isFull, price, paymentType, guestCount, email, phone, loading, totalDays} = this.state
    const {selectedRoom, roomTypes} = this.props
    if (isFull) return <FullyBooked onClose={this.onCloseModal}/>
    if (instructions || loading) return <CheckEmail onClose={this.onCloseModal} instructions={instructions} loading={loading}/>
    return (
      <Fragment>
          { errorMessage && <ErrorAlert message={errorMessage} onClose={this.onCloseErrorAlert}/>}
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
  roomTypes: PropTypes.arrayOf(roomType).isRequired,
}

export default FormSection
