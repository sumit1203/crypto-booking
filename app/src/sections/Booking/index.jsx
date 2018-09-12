import React, { Fragment } from 'react';
import { withWeb3 } from '../../contexts/Web3Context';
import Loader from '../../components/Loader';
import BookingPoC from '../../abis/BookingPoC.json';
import RoomsSection from './RoomsSection';
import FormSection from './FormSection';
import MyBookingSection from './MyBookingSection';
import { HOTEL_URL, BOOKING_POC_ADDRESS } from '../../config';

const PRICES_BY_ROOMTYPE = {
  'pure-cozy': 150,
  'white-brown-comfort': 160,
};

class BookingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      roomTypes: [],
      selectedRoom: {},
      isBookingDisabled: false,
    };
  }

  async componentDidMount() {
    const { web3 } = this.props;
    const bookingPoC = new web3.eth.Contract(BookingPoC.abi, BOOKING_POC_ADDRESS);
    const endDate = (await bookingPoC.methods.endBookings().call()) * 1000;
    const isBookingDisabled = Date.now() > endDate;
    this.setState({ isBookingDisabled });
    try {
      const { data } = await (await fetch('https://api.coinmarketcap.com/v2/ticker/2728/?convert=EUR')).json();
      const lifQuotation = data.quotes.EUR.price;
      const roomTypesResponse = await fetch(`${HOTEL_URL}/roomTypes`);
      const roomTypes = await roomTypesResponse.json();
      const mappedRooms = await Object.values(roomTypes).reduce(async (acc, room) => {
        const resolvedAcc = await acc;
        const isFull = isBookingDisabled || !(await this.isRoomTypeAvailable(bookingPoC, room.id));
        const price = PRICES_BY_ROOMTYPE[room.id];
        const lifPrice = Math.round(price * lifQuotation / 0.5);
        const ethPrice = Math.round(price * 0.8);
        return [...resolvedAcc, {
          ...room, isFull, price, lifPrice, ethPrice,
        }];
      }, []);
      this.setState({ isLoading: false, roomTypes: mappedRooms, selectedRoom: mappedRooms[0] });
    } catch (e) {
      this.setState({ isLoading: true });
      console.error(e);
    }
  }

  onRoomTypeChange = (selectedRoom) => {
    this.setState({ selectedRoom });
  }

  isRoomTypeAvailable = async (bookingPoC, roomType) => {
    const nights = [1, 2, 3, 4];
    const availabilityByNight = await Promise.all(nights.map(async (night) => {
      const availability = await this.availability(bookingPoC, roomType, [night]);
      return availability.some(a => !!parseInt(a, 10));
    }));
    return availabilityByNight.some(a => a);
  };

  availability = async (bookingPoC, roomType, nights = [1, 2, 3, 4]) => {
    const { roomsAvailable } = bookingPoC.methods;
    return roomsAvailable(roomType, nights).call();
  }

  render() {
    const {
      isLoading, selectedRoom, roomTypes, isBookingDisabled,
    } = this.state;

    if (isLoading) {
      return (
        <Loader block={200} label="Loading..." />
      );
    }

    return (
      <Fragment>
        <RoomsSection
          onRoomTypeChange={this.onRoomTypeChange}
          roomTypes={roomTypes}
          isBookingDisabled={isBookingDisabled}
        />
        {!isBookingDisabled && (
        <FormSection
          onRoomTypeChange={this.onRoomTypeChange}
          selectedRoom={selectedRoom}
          roomTypes={roomTypes}
        />
        )}
        {!isBookingDisabled && <MyBookingSection />}
      </Fragment>
    );
  }
}

export default withWeb3(BookingContainer);
