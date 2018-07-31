import React from 'react';
import Loader from '../Loader';
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
    if (isLoading) return  (
      <Loader block={200} label="Loading..."/>
    )
    return (
      <Hotel
        name={hotelData.name}
        description={hotelData.description}
        location={hotelData.location}
        url={hotelData.contacts.general.url}
      />
    );
  }
}

export default HotelContainer;
