import React from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3'

import { roomType } from '../propTypes'

import BookingPoC from '../../../abis/BookingPoC.json'
import RoomBooking from './RoomBooking'
import CheckEmail from './CheckEmail'
import FullyBooked from './FullyBooked'
import { WEB3_PROVIDER, BOOKING_POC_ADDRESS, SIGNER_API } from '../../../config'

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
      from: '2018-09-06',
      to: null,
      fullName: null,
      birthDate: null,
      email: null,
      phone: null,
      instructions: null,
      toDateMin: '2018-09-07',
      fromDateMax: '2018-09-09',
      price: null,
      guestCount: '1'
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
  onFromDateChange = (e) => {
    const from = e.target.value
    this.setState({from, toDateMin: this._addDay(from, 1)}, this.computePrice)
  }

  onToDateChange = (e) => {
    const to = e.target.value
    this.setState({to, fromDateMax: this._addDay(to, -1)}, this.computePrice)
  }
  onFullNameChange = (e) => {
    this.setState({fullName: e.target.value})
  }
  onBirthDateChange = (e) => {
    this.setState({birthDate: e.target.value})
  }
  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  onPhoneChange = (e) => {
    this.setState({phone: e.target.value})
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
    const {from, to} = this.state
    const {price} = roomType
    if (!from || !to || !price) return
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const daysCount = (new Date(toDate - fromDate)).getDate()
    const total = price * daysCount
    this.setState({price: total})
  }

  onSubmit = async ({paymentType, guestEthAddress, captchaToken}) => {
    const {from, to, fullName, birthDate, email, phone, guestCount} = this.state
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
    const response = await fetch(SIGNER_API + '/api/booking', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {signatureData, offerSignature, booking, contractAddress} = await response.json()
    console.log('Signature data:', signatureData)
    console.log('Offer signature:', offerSignature)
    const txData = this.bookingPoC.methods.bookWithEth(
      signatureData.weiPerNight, signatureData.signatureTimestamp, offerSignature,
      signatureData.roomType, [1, 2, 3, 4], signatureData.bookingHash
    ).encodeABI()
    this.setState({
      instructions: {
        value: booking.paymentAmount,
        to: contractAddress,
        data: txData
      }
    })
  }

  onCloseModal = () => {
    this.setState({isFull: null, instructions: null})
  }

  render () {
    const {from, instructions, isFull, price, toDateMin, fromDateMax, guestCount} = this.state
    const {selectedRoom, roomTypes} = this.props
    if (isFull) return <FullyBooked onClose={this.onCloseModal}/>
    if (instructions) return <CheckEmail onClose={this.onCloseModal}
                                         paymentAmount={instructions.value}
                                         contract={instructions.to}
                                         offerSignature={instructions.data}/>
    return (
      <RoomBooking
        from={from}
        roomTypes={roomTypes}
        selectedRoom={selectedRoom}
        toDateMin={toDateMin}
        fromDateMax={fromDateMax}
        price={price}
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
    )
  }
}

FormSection.propTypes = {
  selectedRoom: roomType,
  onRoomTypeChange: PropTypes.func.isRequired,
  roomTypes: PropTypes.arrayOf(roomType).isRequired
}

export default FormSection
