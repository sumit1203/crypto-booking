import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PriceLabel from './PriceLabel';
import ConfirmModal from './ConfirmModal';
import RulesModal from './RulesModal';
import { roomType } from '../propTypes';
import $ from 'jquery'
import {validateEmail, validatePhone} from './inputValidations'

export default class RoomBooking extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isValidEmail: true,
      isValidPhone: true,
      isConfirmModalOpen: false
    }

  }
  showRulesModal = (e) => {
    e.preventDefault()
    $('#modalRules').modal('show')
  }

  onConfirmModalClose = () => {
    this.setState({isConfirmModalOpen: false})
  }

  handleConfirmModalOnSubmit = (data) => {
    this.props.onSubmit(data)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {email, phone} = this.props
    const isValidEmail = validateEmail(email)
    const isValidPhone = validatePhone(phone)
    this.setState({isValidEmail, isValidPhone})
    if (isValidEmail && isValidPhone) this.setState({isConfirmModalOpen: true})
  }

  renderRoomTypes = () => {
    const {roomTypes, selectedRoom, onRoomTypeChange} = this.props
    return roomTypes.map((room,index) => {
     return (
       <Fragment key={room.id}>
        <input id={`radio-${room.id}`} name="type" type="radio" value={room.id} onChange={onRoomTypeChange} checked={selectedRoom.id === room.id} required/>
        <label htmlFor={`radio-${room.id}`} style={{whiteSpace: 'initial'}}>
          <i className="mdi mdi-check-circle d-none d-sm-inline"/>
          {index === 0 ? ' Twin Bed' : index === 1 && ' King Bed'}
        </label>

       </Fragment>)
    })
  }

  render() {
    const {
      phone,
      to,
      email,
      from,
      price,
      paymentType,
      days,
      onPaymentTypeChange,
      guestCount,
      onGuestCountChange,
      onFullNameChange,
      onBirthDateChange,
      onEmailChange,
      onPhoneChange,
      onDaysChange,
    } = this.props;
    const {isValidEmail, isValidPhone, isConfirmModalOpen} = this.state
    return (
      <article id='book-a-room' className="section-wrapper bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <header className="text-center">
                <h2 className="mb-1">Book a Room</h2>
                <p className="lead h4 mb-2">
                  All rooms are offered to book only within ETH Berlin dates September 6-10, 2018
                </p>
              </header>
              <form onSubmit={this.onSubmit}>
                <section>
                  <h5 className="mb-1 text-center">Guests</h5>
                  <div className="row justify-content-center">
                    <div className="media mb-2">
                      <i className="mdi mdi-account mdi-48px text-dark mr-1" style={{marginTop: -17}}/>
                      <div className="media-body">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="guests" id="guests1" value='1' onChange={onGuestCountChange} checked={guestCount === '1'} required/>
                          <label className="form-check-label" htmlFor="guests1">&nbsp; One person
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="guests" id="guests2" value="2" onChange={onGuestCountChange} checked={guestCount === '2'} required/>
                          <label className="form-check-label" htmlFor="guests2">&nbsp; Two people
                          </label>
                        </div>
                      </div>
                   </div>
                  </div>
                </section>
                {/*TODO: in case one of the options is unavailable use the class "disabled" and the attribute "disabled" on that item*/}
                <section className="text-center mb-2">
                  <h5 className="mb-1"> Preferred room type </h5>
                  <div className="form-row">
                    <div className="col-12 mb-1 mb-sm-0">
                      <div className="btn-group btn-group--switch mr-auto ml-auto" role="group" aria-label="Room type">
                        {this.renderRoomTypes()}
                      </div>
                    </div>
                  </div>
                </section>
                <section className="text-center mb-2">
                  <h5 className="mb-1"> Reservation date </h5>
                  <div className="form-row">
                    <div className="col-12 mb-1 mb-sm-0">

                      <div className="btn-group btn-group--switch mr-auto ml-auto" role="group" aria-label="Room type">

                        {
                          days.map((day) => (
                            <Fragment key={day}>
                              <input type="checkbox" name="days" id={"days-" + day} value={day} onChange={onDaysChange} checked={day >= from && day <= to}/>
                              <label htmlFor={"days-" + day} className="font--alt">{5 + day}/9</label>
                            </Fragment>
                          ))
                        }

                      </div>

                    </div>
                  </div>
                </section>
                <div className="card bg-white block-shadow mb-2">
                  <h5 className="px-2 py-2"> Guest information </h5>
                  <section className="row text-center px-2 pb-2">
                    <div className="col text-left">
                      <label htmlFor="fullName"> <b>Full Name</b> </label>
                      <input className="form-control form-control-lg mb-1" id="fullName" autoComplete="off" type="text" onChange={onFullNameChange} required/>
                      <label htmlFor="birthDate"> <b>Birth Date</b> </label>
                      <input className="form-control form-control-lg" id="birthDate" autoComplete="off" type="date" onChange={onBirthDateChange} required/>
                    </div>
                    <div className="col text-left">
                      <label htmlFor="email"> <b>Email</b> </label>
                      <input className={classnames('form-control', 'form-control-lg', 'mb-1', {'is-invalid': !isValidEmail})} id="email" autoComplete="off" type="email" onChange={onEmailChange} value={email} required/>
                      <label htmlFor="phone"> <b>Phone Number</b> </label>
                      <input className={classnames('form-control', 'form-control-lg', {'is-invalid': !isValidPhone})} id="phone" autoComplete="off" type="tel" onChange={onPhoneChange} value={phone} maxLength={14} required/>
                    </div>
                  </section>
                </div>
                <section className="text-center">
                  {price && <PriceLabel value={price}/>}
                  <button className="btn btn-primary btn-lg" type="submit">Proceed with booking</button>
                    <br/>
                    <button style={{marginTop: '0.5em'}} className="btn btn-sm btn-link btn-light text-dark" onClick={this.showRulesModal}>
                      Hotel rules
                    </button>
                </section>
              </form>
            </div>
          </div>
        </div>
        {isConfirmModalOpen && <ConfirmModal onSubmit={this.handleConfirmModalOnSubmit} price={price} paymentType={paymentType}
                                             onClose={this.onConfirmModalClose} onPaymentTypeChange={onPaymentTypeChange}/>}
        <RulesModal/>
      </article>
    );
  }
}

RoomBooking.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedRoom: roomType,
  guestCount: PropTypes.string,
  price: PropTypes.number,
  roomTypes: PropTypes.arrayOf(roomType).isRequired,
  paymentType: PropTypes.string.isRequired,
  onPaymentTypeChange: PropTypes.func.isRequired,
  onRoomTypeChange: PropTypes.func.isRequired,
  onGuestCountChange: PropTypes.func.isRequired,
  onDaysChange: PropTypes.func.isRequired,
  onFullNameChange: PropTypes.func.isRequired,
  onBirthDateChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
