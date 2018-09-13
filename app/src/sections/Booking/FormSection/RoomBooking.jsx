import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import $ from 'jquery';
import PriceLabel from './PriceLabel';
import ConfirmModal from './ConfirmModal';
import RulesModal from './RulesModal';
import CancellationPolicyModal from './CancellationPolicyModal';
import { roomType } from '../propTypes';
import { validateEmail, validatePhone } from './inputValidations';
import { INITIAL_DATE, FINAL_DATE } from '../../../config';

export default class RoomBooking extends React.Component {
  static defaultProps = {
    price: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      isValidEmail: true,
      isValidPhone: true,
      isConfirmModalOpen: false,
    };
  }

  onConfirmModalClose = () => {
    this.setState({ isConfirmModalOpen: false });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, phone } = this.props;
    const isValidEmail = validateEmail(email);
    const isValidPhone = validatePhone(phone);
    this.setState({ isValidEmail, isValidPhone });
    if (isValidEmail && isValidPhone) this.setState({ isConfirmModalOpen: true });
  }

  handleConfirmModalOnSubmit = (data) => {
    const { onSubmit } = this.props;
    onSubmit(data);
  }

  showRulesModal = (e) => {
    e.preventDefault();
    $('#modalRules').modal('show');
  }

  showCancellationPolicyModal = (e) => {
    e.preventDefault();
    $('#modalCancellationPolicy').modal('show');
  }

  renderDays = () => {
    const {
      to,
      from,
      onDaysChange,
    } = this.props;
    const fromAsUnix = from.unix();
    const toAsUnix = to.unix();
    const initialDate = moment(INITIAL_DATE);
    const finalDate = moment(FINAL_DATE);
    const currentDate = initialDate.clone();
    const numberOfDays = Math.max(0, finalDate.diff(initialDate, 'days'));
    const days = Array.from((new Array(numberOfDays)), (e, i) => i);
    return days.map((i) => {
      currentDate.add(1, 'd');
      const currentDateAsUnix = currentDate.unix();
      return (
        <Fragment key={i}>
          <input
            type="checkbox"
            name="days"
            id={`days-${i}`}
            value={currentDateAsUnix}
            onChange={onDaysChange}
            checked={currentDateAsUnix >= fromAsUnix && currentDateAsUnix <= toAsUnix}
          />
          <label htmlFor={`days-${i}`} className="font--alt">
            {currentDate.format('DD/MM')}
          </label>
        </Fragment>
      );
    });
  }

  renderRoomTypes = () => {
    const { roomTypes, selectedRoom, onRoomTypeChange } = this.props;
    return roomTypes.map((room, index) => (
      <Fragment key={room.id}>
        <input
          id={`radio-${room.id}`}
          name="type"
          type="radio"
          value={room.id}
          onChange={onRoomTypeChange}
          checked={selectedRoom.id === room.id}
          required
        />
        <label htmlFor={`radio-${room.id}`} className="w-50">
          <i className="mdi mdi-check-circle d-none d-sm-inline" />
          {index === 0 ? (
            <span>
              King
              <span className="hide-xs">
              -size
              </span>
              Bed
            </span>
          ) : index === 1 && ' Twin Bed'}
        </label>

      </Fragment>));
  }

  render() {
    const {
      phone,
      email,
      price,
      paymentType,
      onPaymentTypeChange,
      guestCount,
      onGuestCountChange,
      onFullNameChange,
      onBirthDateChange,
      onEmailChange,
      onPhoneChange,
    } = this.props;
    const { isValidEmail, isValidPhone, isConfirmModalOpen } = this.state;
    return (
      <article id="book-a-room" className="section-wrapper bg-light py-3 py-md-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <header className="text-center">
                <h2 className="mb-1">
                  Book a Room
                </h2>
                <p className="lead h4 mb-2">
                  All rooms are offered to book only within ETH Berlin dates September 6-10, 2018
                </p>
              </header>
              <form onSubmit={this.onSubmit}>
                <section>
                  <h5 className="text-center">
                    Guests
                  </h5>
                  <div className="row justify-content-center">
                    <div className="media mb-2 d-flex align-items-center">
                      <i className="mdi mdi-account mdi-48px text-dark mr-1" />
                      <div className="media-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="guests"
                            id="guests1"
                            value="1"
                            onChange={onGuestCountChange}
                            checked={guestCount === '1'}
                            required
                          />
                          <label className="form-check-label" htmlFor="guests1">
                            &nbsp; One person
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="guests"
                            id="guests2"
                            value="2"
                            onChange={onGuestCountChange}
                            checked={guestCount === '2'}
                            required
                          />
                          <label className="form-check-label" htmlFor="guests2">
                            &nbsp; Two people
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="text-center mb-2">
                  <h5 className="mb-1">
                    Type of Room
                  </h5>
                  <div className="form-row">
                    <div className="col-12 mb-1 mb-sm-0">
                      <div
                        className="btn-group btn-group--switch col-sm-12 col-md-10 col-lg-7 mr-auto ml-auto"
                        role="group"
                        aria-label="Room type"
                      >
                        {this.renderRoomTypes()}
                      </div>
                    </div>
                  </div>
                </section>
                <section className="text-center mb-2">
                  <h5 className="mb-1">
                    Reservation Date
                  </h5>
                  <div className="form-row">
                    <div className="col-12 mb-1 mb-sm-0">

                      <div className="btn-group btn-group--switch mr-auto ml-auto" role="group" aria-label="Room type">
                        {
                          this.renderDays()
                        }
                      </div>

                    </div>
                  </div>
                </section>
                <div className="card bg-white block-shadow mb-2">
                  <h5 className="px-2 py-2">
                    Guest information
                  </h5>
                  <section className="row text-center px-2 pb-2">
                    <div className="col text-left">
                      <label htmlFor="fullName">
                        <b>
                          Full Name
                        </b>
                      </label>
                      <input
                        className="form-control form-control-lg mb-1"
                        id="fullName"
                        autoComplete="off"
                        type="text"
                        onChange={onFullNameChange}
                        required
                      />
                      <label htmlFor="birthDate">
                        <b>
                          Birth Date
                        </b>
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="birthDate"
                        autoComplete="off"
                        type="date"
                        onChange={onBirthDateChange}
                        required
                      />
                    </div>
                    <div className="col text-left">
                      <label htmlFor="email">
                        <b>
                          Email
                        </b>
                      </label>
                      <input
                        className={classnames('form-control', 'form-control-lg', 'mb-1', { 'is-invalid': !isValidEmail })}
                        id="email"
                        autoComplete="off"
                        type="email"
                        onChange={onEmailChange}
                        value={email}
                        required
                      />
                      <label htmlFor="phone">
                        <b>
                          Phone Number
                        </b>
                      </label>
                      <input
                        className={classnames('form-control', 'form-control-lg', { 'is-invalid': !isValidPhone })}
                        id="phone"
                        autoComplete="off"
                        type="tel"
                        onChange={onPhoneChange}
                        value={phone}
                        maxLength={14}
                        required
                      />
                    </div>
                  </section>
                </div>
                <section className="text-center">
                  {price && <PriceLabel value={price} />}
                  <button className="btn btn-primary" type="submit">
                    Proceed with booking
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn btn-sm btn-link btn-light text-dark"
                    onClick={this.showCancellationPolicyModal}
                  >
                    Cancellation and refund policy
                  </button>
                  <br />
                  <button type="button" className="m-0 btn btn-sm btn-link btn-light text-dark" onClick={this.showRulesModal}>
                    Hotel rules
                  </button>
                </section>
              </form>
            </div>
          </div>
        </div>
        {isConfirmModalOpen && (
          <ConfirmModal
            onSubmit={this.handleConfirmModalOnSubmit}
            price={price}
            paymentType={paymentType}
            onClose={this.onConfirmModalClose}
            onPaymentTypeChange={onPaymentTypeChange}
          />
        )}
        <RulesModal />
        <CancellationPolicyModal />
      </article>
    );
  }
}

RoomBooking.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  from: PropTypes.instanceOf(moment).isRequired,
  to: PropTypes.instanceOf(moment).isRequired,
  selectedRoom: roomType.isRequired,
  guestCount: PropTypes.string.isRequired,
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
};
