import React from 'react';

export default class RoomBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'eth'
    };
  }

  onRoomTypeChange = (e) => {
    this.setState({ roomType: e.target.value });
    console.log(e.target.value)
  }

  onFromDateChange = (e) => {
    this.setState({ fromDate: e.target.value });
      console.log(e.target.value)
  }

  onToDateChange = (e) => {
    this.setState({ toDate: e.target.value });
    console.log(e.target.value)
  }
  onAddressChange = (e) => {
    this.setState({ guestEthAddress: e.target.value });
  }
  onFullNameChange = (e) => {
    this.setState({ fullName: e.target.value });
  }
  onBirthDateChange = (e) => {
    this.setState({ birthDate: e.target.value });
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }
  onPhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault()
      const {roomType, fromDate, toDate, guestEthAddress, ...personalInfo} = this.state
      const data = {roomType, fromDate, toDate, guestEthAddress, personalInfo}
      fetch('http://localhost:3001/api/booking', {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
              'Content-Type': 'application/json'
          }
      }).then(res => res.json())
        .then(res => console.log(res))
  }

  render() {
    const labelBlockStyle = {display: 'block', fontWeight: "bold"};
    return (
      <div style={{ margin: 'auto', width: '500px' }}>
        <h2>
            Book a Room
        </h2>
        <p>
            All rooms offered to book only within ETH Berlin Dates: 6.09 - 10.09
        </p>
        <form onSubmit={this.onSubmit}>
          <Section>
            <label htmlFor='twin' style={{marginRight: 8}}>Twin Room</label>
            <input id='twin' style={{display: 'inline-block', marginBottom: "5px"}} type="radio" value="twin" onChange={this.onRoomTypeChange}/>
          </Section>
          <Section>
            <label htmlFor='double' style={{marginRight: 8}}>Double Room</label>
            <input id='double' style={{display: 'inline-block', marginBottom: "5px"}} type="radio" value="double" onChange={this.onRoomTypeChange}/>
          </Section>
          <Section>
            <input style={{marginRight: '5px'}} type="date" min='2018-09-06' max='2018-09-09' onChange={this.onFromDateChange}/>
            <input type="date" name="to" min='2018-09-06' max='2018-09-09' onChange={this.onToDateChange}/>
          </Section>
          <Section>
            <label htmlFor='guestAddress' style={labelBlockStyle}>Guest Eth Address</label>
            <input id='guestAddress' style={{marginRight: '5px'}} type="text" onChange={this.onAddressChange}/>
          </Section>
          <Section>
              <div style={{display: 'inline-block'}}>
                <label htmlFor='fullName' style={labelBlockStyle}>Full Name</label>
                <input id='fullName' style={{marginRight: '5px'}} type="text" onChange={this.onFullNameChange}/>
                <label htmlFor='birthDate' style={labelBlockStyle}>birth Date</label>
                <input id='birthDate' style={{marginRight: '5px'}} type="date" onChange={this.onBirthDateChange}/>
              </div>
                <div style={{display: 'inline-block'}}>
                <label htmlFor='email' style={labelBlockStyle}>Email</label>
                <input id='email' style={{marginRight: '5px'}} type="email" onChange={this.onEmailChange}/>
                <label htmlFor='phone' style={labelBlockStyle}>Phone Number</label>
                <input id='phone' style={{marginRight: '5px'}} type="tel" onChange={this.onPhoneChange}/>
              </div>
          </Section>
          <Section>
            <button type='submit' children='BOOK'/>
          </Section>
        </form>
      </div>
    );
  }
}

const Section = ({children}) => (
    <div style={{width: "960px", margin: 'auto', padding: 12}}>{children}</div>
)