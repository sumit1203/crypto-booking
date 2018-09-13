import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import $ from 'jquery';
import {
  BOOKING_POC_ADDRESS, SIGNER_API, INITIAL_DATE, FINAL_DATE,
} from '../../../config';
import BookingPoC from '../../../abis/BookingPoC.json';
import RoomBooking from './RoomBooking';
import CheckEmail from './CheckEmail';
import FullyBooked from './FullyBooked';
import ErrorAlert from '../../../components/ErrorAlert';

import { roomType as roomTypePropType } from '../propTypes';
import { withWeb3 } from '../../../contexts/Web3Context';

class FormSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'eth',
      from: moment(INITIAL_DATE),
      to: moment(FINAL_DATE),
      fullName: null,
      birthDate: null,
      email: '',
      phone: '+',
      instructions: null,
      price: null,
      guestCount: '1',
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { web3 } = this.props;
    this.bookingPoC = new web3.eth.Contract(BookingPoC.abi, BOOKING_POC_ADDRESS);
    this.computePrice();
  }

  onPaymentTypeChange = (e) => {
    this.setState({ paymentType: e.target.value }, this.computePrice);
  }

  onDaysChange = (e) => {
    const day = moment.unix(e.target.value);
    const { to, from } = this.state;
    const dayAsUnix = day.unix();
    let dayFrom = Math.min(from.unix(), dayAsUnix);
    let dayTo = Math.max(to.unix(), dayAsUnix);

    if (!e.target.checked) {
      dayFrom = Math.min(dayAsUnix, moment(FINAL_DATE).subtract(1).unix());
      dayTo = Math.min(day.clone().add(1, 'day').unix(), moment(FINAL_DATE).unix());
    }
    this.setState({ from: moment.unix(dayFrom), to: moment.unix(dayTo) }, this.computePrice);
  }

  onFullNameChange = (e) => {
    this.setState({ fullName: e.target.value });
  }

  onBirthDateChange = (e) => {
    this.setState({ birthDate: e.target.value });
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({ email });
  }

  onPhoneChange = (e) => {
    const phone = e.target.value;
    const regexp = /^\+/;
    if (!regexp.test(phone)) return;
    this.setState({ phone });
  }

  onGuestCountChange = (e) => {
    this.setState({ guestCount: e.target.value });
  }

  onRoomTypeChange = (e) => {
    const { onRoomTypeChange, roomTypes } = this.props;
    const selectedRoom = roomTypes.find(room => room.id === e.target.value);
    this.computePrice(selectedRoom);
    onRoomTypeChange(selectedRoom);
  }

  onSubmit = async ({ guestEthAddress, captchaToken }) => {
    const {
      from, to, fullName, birthDate, email, phone, guestCount, paymentType,
    } = this.state;
    const { selectedRoom: { id: roomType } } = this.props;
    const mappedFromDate = from.diff(moment(INITIAL_DATE), 'd');
    const mappedToDate = to.diff(moment(INITIAL_DATE), 'd');
    const nights = [];
    for (let i = mappedFromDate; i < mappedToDate; i++) {
      nights.push(i);
    }
    const availableRooms = await this.bookingPoC.methods.roomsAvailable(roomType, nights).call();
    if (!availableRooms.some(roomFlag => !!parseInt(roomFlag, 10))) {
      this.setState({ isFull: true });
      return;
    }
    const data = {
      'g-recaptcha-response': captchaToken,
      paymentType,
      guestCount,
      roomType,
      from: from.format('YYYY-MM-DD'),
      to: to.format('YYYY-MM-DD'),
      guestEthAddress,
      personalInfo: {
        fullName, birthDate, phone, email,
      },
    };
    try {
      this.setState({ loading: true });
      const response = await (await fetch(`${SIGNER_API}/api/booking`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })).json();

      if (response.status >= 400) {
        console.error(response);
        // HOT FIX to remove blackscreen on error. We should remove bootstrap or use https://react-bootstrap.github.io/
        $('#checkEmail').modal('hide');
        this.setState({ errorMessage: response.long, loading: false });
        return;
      }
      const { txs, booking } = response;
      const txsWithFrom = txs.map(tx => ({ from: booking.guestEthAddress, ...tx }));
      this.setState({
        instructions: { txs: txsWithFrom, booking },
      });
    } catch (e) {
      console.error(e);
    }
    this.setState({ loading: false });
  }

  onCloseModal = () => {
    this.setState({ isFull: null, instructions: null });
  }

  onCloseErrorAlert = () => {
    this.setState({ errorMessage: '' });
  }

  computePrice = (roomType = this.props.selectedRoom) => {
    const { from, to, paymentType } = this.state;
    const { ethPrice, lifPrice } = roomType;
    if (!from || !to) return;
    const daysCount = to.diff(from, 'd');
    const price = paymentType === 'lif' ? lifPrice : ethPrice;
    const total = price * daysCount;
    this.setState({ price: total });
  }

  render() {
    const {
      errorMessage,
      from,
      to,
      instructions,
      isFull,
      price,
      paymentType,
      guestCount,
      email,
      phone,
      loading,
    } = this.state;
    const { selectedRoom, roomTypes } = this.props;
    if (isFull) return <FullyBooked onClose={this.onCloseModal} />;
    if (instructions || loading) {
      return (
        <CheckEmail
          onClose={this.onCloseModal}
          instructions={instructions}
          loading={loading}
        />
      );
    }
    return (
      <Fragment>
        {errorMessage && <ErrorAlert message={errorMessage} onClose={this.onCloseErrorAlert} />}
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
          onGuestCountChange={this.onGuestCountChange}
          onRoomTypeChange={this.onRoomTypeChange}
          onFullNameChange={this.onFullNameChange}
          onBirthDateChange={this.onBirthDateChange}
          onEmailChange={this.onEmailChange}
          onPhoneChange={this.onPhoneChange}
          onDaysChange={this.onDaysChange}
          onSubmit={this.onSubmit}
        />
      </Fragment>
    );
  }
}

FormSection.propTypes = {
  selectedRoom: roomTypePropType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  web3: PropTypes.object.isRequired,
  onRoomTypeChange: PropTypes.func.isRequired,
  roomTypes: PropTypes.arrayOf(roomTypePropType).isRequired,
};

export default withWeb3(FormSection);
