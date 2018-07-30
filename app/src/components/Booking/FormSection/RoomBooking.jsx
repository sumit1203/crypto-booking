import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import PriceLabel from './PriceLabel';
import ConfirmModal from './ConfirmModal';
import RulesModal from './RulesModal';
import { roomType } from '../propTypes';
import $ from 'jquery'

// import lifToken from 'windingtree-media-web/custom-icons/svg/wt-icon--lif-token.svg';

export default class RoomBooking extends React.Component {
  showRulesModal = (e) => {
    e.preventDefault()
    $('#modalRules').modal('show')
  }

  handleConfirmModalOnSubmit = (data) => {
    this.props.onSubmit(data)
  }

  onSubmit = (e) => {
    e.preventDefault()
    $('#modalConfirm').modal('show')
  }

  renderRoomTypes = () => {
    const {roomTypes, selectedRoom, onRoomTypeChange} = this.props
    return roomTypes.map(room => {
     return (
       <Fragment key={room.id}>
         <input id={room.id} name="type" type="radio" value={room.id} onChange={onRoomTypeChange} checked={selectedRoom.id === room.id} required/>
         <label htmlFor={room.id} className="col-6">{room.name}</label>
       </Fragment>)
    })
  }

  render() {
    const {
      toDateMin,
      fromDateMax,
      from,
      price,
      onFromDateChange,
      onToDateChange,
      onFullNameChange,
      onBirthDateChange,
      onEmailChange,
      onPhoneChange,
    } = this.props;

    return (
      <article id='BookARoom' className="section-wrapper bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <header className="text-center">
                <h2 className="mb-1">Book a Room</h2>
                <p className="lead h4 mb-2">
                    All rooms offered to book only within ETH Berlin Dates 6.09 - 10.09
                </p>
              </header>
              <form onSubmit={this.onSubmit}>
                {/*TODO: in case one of the options is unavailable use the class "disabled" and the attribute "disabled" on that item*/}
                <section className="text-center mb-2">
                  <h5 className="mb-1"> Preffered room type </h5>
                  <div className="btn-group btn-group--switch w-100" role="group" aria-label="Room type">
                    {this.renderRoomTypes()}
                  </div>
                  {/* NOTE: Change the messages depending on room availability */}
                  {/* <p>* Only Tween rooms are available</p> */}
                </section>
                <section className="text-center mb-2">
                  <h5 className="mb-1"> Reservation date </h5>
                  <div className="form-row">
                    <div className="col-12 col-sm-6 mb-1 mb-sm-0">
                      <input className="form-control form-control-lg" type="date" min="2018-09-06" max={fromDateMax} onChange={onFromDateChange} value={from} required/>
                    </div>
                    <div className=" col-12 col-sm-6">
                      <input className="form-control form-control-lg" type="date" name="to" min={toDateMin} max="2018-09-10" onChange={onToDateChange} required/>
                    </div>
                  </div>
                </section>
                <div className="card bg-white block-shadow mb-2">
                  <h5 className="px-2 py-2"> Guest information </h5>
                  <section className="row text-center px-2 pb-2">
                    <div className="col text-left">
                      <label htmlFor="fullName"> <b>Full Name</b> </label>
                      <input className="form-control form-control-lg mb-1" id="fullName" type="text" onChange={onFullNameChange} placeholder='Pedrotti Capone' required/>
                      <label htmlFor="birthDate"> <b>Birth Dat</b>e </label>
                      <input className="form-control form-control-lg" id="birthDate" type="date" onChange={onBirthDateChange} required/>
                    </div>
                    <div className="col text-left">
                      <label htmlFor="email"> <b>Email</b> </label>
                      <input className="form-control form-control-lg mb-1" id="email" type="email" onChange={onEmailChange} placeholder='someGuy@windingtree.com' required/>
                      <label htmlFor="phone"> <b>Phone Number</b> </label>
                      <input className="form-control form-control-lg" id="phone" type="tel" onChange={onPhoneChange} placeholder='+54 011 1135989272' required/>
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
        <ConfirmModal onSubmit={this.handleConfirmModalOnSubmit} price={price}/>
        <RulesModal/>
      </article>
    );
  }
}

RoomBooking.propTypes = {
  toDateMin: PropTypes.string.isRequired,
  fromDateMax: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  selectedRoom: roomType,
  price: PropTypes.number,
  roomTypes: PropTypes.arrayOf(roomType).isRequired,
  onRoomTypeChange: PropTypes.func.isRequired,
  onFromDateChange: PropTypes.func.isRequired,
  onToDateChange: PropTypes.func.isRequired,
  onFullNameChange: PropTypes.func.isRequired,
  onBirthDateChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

