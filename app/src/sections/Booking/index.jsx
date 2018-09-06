import React, {Fragment} from 'react';
import Web3 from 'web3';
import Loader from '../../components/Loader';
import BookingPoC  from '../../abis/BookingPoC.json';
import RoomsSection from './RoomsSection'
import FormSection from './FormSection'
import MyBookingSection from './MyBookingSection'
import { WEB3_PROVIDER, HOTEL_URL, BOOKING_POC_ADDRESS } from '../../config'

const PRICES_BY_ROOMTYPE = {
  'pure-cozy': 150,
  'white-brown-comfort': 160
}

export default class BookingContainer extends React.Component {
  static web3 = web3 ? new Web3(web3.currentProvider) : new Web3(WEB3_PROVIDER)
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      roomTypes: [],
      selectedRoom: {},
      isBookingDisabled: false
    }
  }

  async componentDidMount() {
      const bookingPoC = new BookingContainer.web3.eth.Contract(BookingPoC.abi, BOOKING_POC_ADDRESS);
      const endDate = await bookingPoC.methods.endBookings().call()
      const isBookingDisabled = Date.now() > endDate
      this.setState({isBookingDisabled})
      try {
      const {data} = await (await fetch('https://api.coinmarketcap.com/v2/ticker/2728/?convert=EUR')).json()
      const lifQuotation = data.quotes.EUR.price
      const roomTypesResponse = await fetch(`${HOTEL_URL}/roomTypes`);
      const roomTypes = await roomTypesResponse.json();
      const mappedRooms = await Object.values(roomTypes).reduce(async (acc, room) => {
        acc = await acc
        const isFull = isBookingDisabled || !(await this._isRoomTypeAvailable(bookingPoC, room.id))
        const price = PRICES_BY_ROOMTYPE[room.id]
        const lifPrice = Math.round(price * lifQuotation/0.5)
        const ethPrice = Math.round(price * 0.8)
        return [...acc, {...room, isFull, price, lifPrice, ethPrice}]
      }, [])
      this.setState({isLoading: false, roomTypes: mappedRooms, selectedRoom: mappedRooms[0]});
    }catch (e) {
      this.setState({ isLoading: true});
      console.error(e);
    }
  }

  _availability = async (bookingPoC, roomType, nights = [1,2,3,4]) => {
    return bookingPoC.methods.roomsAvailable(roomType, nights).call();
  }

  _isRoomTypeAvailable = async(bookingPoC, roomType) => {
    const nights = [1,2,3,4];
    const availabilityByNight = await Promise.all(nights.map(async (night) => {
      const availability = await this._availability(bookingPoC, roomType, [night]);
      return availability.some(a => !!parseInt(a))
    }))
    return availabilityByNight.some(a => a)
  };

  onRoomTypeChange = (selectedRoom) => {
    this.setState({selectedRoom})
  }

  render () {
    const {isLoading, selectedRoom, roomTypes, isBookingDisabled} = this.state

    if (isLoading) return  (
      <Loader block={200} label="Loading..."/>
    )

    return (
      <Fragment>
        <RoomsSection onRoomTypeChange={this.onRoomTypeChange} roomTypes={roomTypes} isBookingDisabled={isBookingDisabled}/>
        {!isBookingDisabled && <FormSection onRoomTypeChange={this.onRoomTypeChange} selectedRoom={selectedRoom} roomTypes={roomTypes}/>}
        {!isBookingDisabled && <MyBookingSection/>}
      </Fragment>
    )
  }
}
