import React from 'react';
import Web3 from 'web3';
// import imgRoom1 from '../../img/content/hotel-rooms/hotel-room-01.jpg';
// import imgRoom4 from '../../img/content/hotel-rooms/hotel-room-04.jpg';
import Room from './Room'
import BookingPoC  from '../../abis/BookingPoC.json';

class RoomsSection extends React.Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3(process.env.WEB3_PROVIDER);
    this.state = {
      isLoading: true,
      roomTypes: []
    };
  }

  async componentDidMount() {
    try {
        const roomTypesResponse = await fetch(`${process.env.HOTEL_URL}/roomTypes`);
        const roomTypes = await roomTypesResponse.json();
        this.setState({roomTypes: Object.values(roomTypes)});
        const availabilities = await Object.keys(roomTypes).reduce(async (acc, roomKey) => {
            acc = await acc;
            return {...acc, [roomKey]: await this.getRoomAvailability(roomKey)}
        }, {});
        this.setState({isLoading: false, availabilities});
        }catch (e) {
        this.setState({ isLoading: true});
        console.error(e);
        }
    }

    getRoomAvailability = async(roomType) => {
        const nights = [1,2,3,4];
        const bookingPoC = new this.web3.eth.Contract(BookingPoC.abi, process.env.BOOKING_POC_ADDRESS);
        return nights.reduce(async (acc, night) => {
          acc = await acc;
          const availability = await this._availability(bookingPoC, roomType, [night]);
          return {...acc, [night]: availability}
        }, {})
    };

    _availability = async (bookingPoC, roomType, nights = [1,2,3,4]) => {
        return bookingPoC.methods.roomsAvailable(roomType, nights).call();
    };

    isRoomTypeFull = (roomType) => {
      const {availabilities} = this.state;
      if (!availabilities) return;
      return !Object.keys(availabilities[roomType])
          .some(day => availabilities[roomType][day].some(availabilityFlag => !!parseInt(availabilityFlag)))
    };

  render() {
    const { isLoading, roomTypes} = this.state;
    if (isLoading) return null; // TODO here should be some Loading component
      console.log(roomTypes);
    return (
      <article className="section-wrapper bg--gradient-toright pt-1 pb-4 text-center text-md-left">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-white my-2 h3">
                  Rooms for hackers with discount
              </h2>
            </div>
          </div>
          <div className="row">
              {roomTypes.map(room => (
                  <div key={room.id} className="col-sm-6">
                      <Room price={room.price} description={room.description} name={room.name} isFull={this.isRoomTypeFull(room.id)} imgSrc={room.images[0]}/>
                  </div>
              ))
              }
          </div>
        </div>
      </article>
    );
  }
}

export default RoomsSection;
