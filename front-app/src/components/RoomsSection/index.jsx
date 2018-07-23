import React from 'react';
import Web3 from 'web3';
import Room from '../Room';

class RoomsSection extends React.Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3(process.env.WEB3_PROVIDER);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    // TODO ask for rooms data
    try {
      const mockedRequest = () => new Promise(() => []);
      const response = await mockedRequest();
      this.setState({ isLoading: false, rooms: response });
    } catch (e) {
      this.setState({ isLoading: true });
    }
  }

  render() {
    const { rooms, isLoading } = this.state;
    if (isLoading) return null; // TODO here should be some Loading component
    return (
    // TODO replace rooms-container by a real css class
      <div className="rooms-container">
        {rooms.map(room => (
          <Room
            description={room.description}
            price={room.price}
            name={room.name}
          />
        ))}
      </div>
    );
  }
}

export default RoomsSection;
