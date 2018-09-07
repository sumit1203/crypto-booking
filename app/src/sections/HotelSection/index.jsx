import React from 'react';
import Loader from '../../components/Loader';
import Hotel from './Hotel';
import { HOTEL_URL } from '../../config'


class HotelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(HOTEL_URL);
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
        hotelLocation={hotelData.location}
        url={hotelData.contacts.general.url}
      />
    );
  }
}

export default HotelContainer;
