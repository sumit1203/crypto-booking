import React from 'react';
import Web3 from 'web3';
import BookingPoC  from '../../abis/BookingPoC.json';
import RoomBooking from './RoomBooking';
import CheckEmail from './CheckEmail';
import FullyBooked from './FullyBooked';

function _formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getUTCMonth() + 1);
    let day = '' + d.getUTCDate();
    const year = d.getUTCFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

class BookingSection extends React.Component {
    constructor(props) {
        super(props);
        this.web3 = new Web3(process.env.WEB3_PROVIDER);
        this.state = {
            paymentType: 'eth',
            from: '2018-09-06'
        };
    }

    componentDidMount() {
        this.bookingPoC = new this.web3.eth.Contract(BookingPoC.abi, process.env.BOOKING_POC_ADDRESS);
    }

    _mapDateToInteger = (date) => {
        return (new Date(date)).getUTCDate() - 5
    };

    onRoomTypeChange = (e) => {
      console.log(e)
        this.setState({ roomType: e.target.value });
    };

    onFromDateChange = (e) => {
        this.setState({ from: e.target.value });
    };

    onToDateChange = (e) => {
        this.setState({ to: e.target.value });
    };
    onAddressChange = (e) => {
        this.setState({ guestEthAddress: e.target.value });
    };
    onFullNameChange = (e) => {
        this.setState({ fullName: e.target.value });
    };
    onBirthDateChange = (e) => {
        this.setState({ birthDate: e.target.value });
    };
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };
    onPhoneChange = (e) => {
        this.setState({ phone: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const {roomType, from, to, guestEthAddress, paymentType, ...personalInfo} = this.state;
        const mappedFromDate = this._mapDateToInteger(from);
        const mappedToDate = this._mapDateToInteger(to) - 1;
        const nights = []
        for(let i=mappedFromDate; i <= mappedToDate; i ++) {
            nights.push(i)
        }
        const availableRooms = await this.bookingPoC.methods.roomsAvailable(roomType, nights).call();
        if (!availableRooms.some(roomFlag => !!parseInt(roomFlag))) {
            this.setState({isFull: true})
            return
        }

        const data = {paymentType, roomType, from: mappedFromDate, to: mappedToDate, guestEthAddress, personalInfo};

        const response = await fetch('http://localhost:3001/api/booking', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const {signatureData, offerSignature, booking, contractAddress} = await response.json();
        console.log('Signature data:', signatureData)
        console.log('Offer signature:', offerSignature)
        const txData = this.bookingPoC.methods.bookWithEth(
          signatureData.weiPerNight, signatureData.signatureTimestamp, offerSignature,
          signatureData.roomType, [1,2,3,4], signatureData.bookingHash
        ).encodeABI();
        this.setState({instructions: {
          value: booking.paymentAmount,
          to: contractAddress,
          data: txData
        }});
    };

    render() {
        const {from, instructions, isFull} = this.state;
        if (isFull) return <FullyBooked/>
            if (instructions) return <CheckEmail paymentAmount={instructions.value}
                                         contract={instructions.to}
                                         offerSignature={instructions.data}/>;
        const fromDate = new Date(from);
        const nextDate = fromDate.setUTCDate(fromDate.getUTCDate() + 1);
        const toDateMin = _formatDate(nextDate);
    return (
      <RoomBooking
          from={from}
          toDateMin={toDateMin}
          onRoomTypeChange={this.onRoomTypeChange}
          onFromDateChange={this.onFromDateChange}
          onToDateChange={this.onToDateChange}
          onAddressChange={this.onAddressChange}
          onFullNameChange={this.onFullNameChange}
          onBirthDateChange={this.onBirthDateChange}
          onEmailChange={this.onEmailChange}
          onPhoneChange={this.onPhoneChange}
          onSubmit={this.onSubmit}/>
    );
  }
}

export default BookingSection;
