import React from 'react';
import Hotel from './Hotel';

class HotelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(process.env.HOTEL_URL);
      const hotelData = await response.json();
      this.setState({ isLoading: false, hotelData });
    } catch (e) {
      this.setState({ isLoading: true });
      console.error(e);
    }
  }

  render() {
    const { hotelData, isLoading } = this.state;
    if (isLoading) return null; // TODO here should be some Loading component
    return (
      <Hotel
        name={hotelData.name}
        description={hotelData.description}
        location={hotelData.location}
        url={hotelData.contacts.url}
      />
    );
  }
}

export default HotelContainer;
