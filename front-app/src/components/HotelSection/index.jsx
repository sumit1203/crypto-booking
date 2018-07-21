import React from 'react';
import Description from './Description';

class HotelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    // TODO here get data form server :(hotel description, rooms(description, price, isAvailable))
    const response = await (new Promise());
    this.setState({ isLoading: false, hotelData: response });
  }

  render() {
    const { hotelData, isLoading } = this.state;
    if (isLoading) return null; // TODO here should be some Loading component
    return (
      <div>
        <Description description={hotelData.description} />
        {/* TODO rooms should be rendered here */}
      </div>
    );
  }
}

export default HotelContainer;
