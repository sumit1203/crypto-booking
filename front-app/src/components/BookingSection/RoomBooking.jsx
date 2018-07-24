import React from 'react';

function _formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getUTCMonth() + 1);
    let day = '' + d.getUTCDate();
    const year = d.getUTCFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export default class RoomBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'eth',
      fromDate: '2018-09-06'
    };
  }

  _mapDateToInteger = (date) => {
      return (new Date(date)).getUTCDate() - 5
  }

  onRoomTypeChange = (e) => {
    this.setState({ roomType: e.target.value });
  }

  onFromDateChange = (e) => {
    console.log(this._mapDateToInteger(e.target.value))
    this.setState({ fromDate: e.target.value });
  }

  onToDateChange = (e) => {
    console.log(this._mapDateToInteger(e.target.value))
    this.setState({ toDate: e.target.value });
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
      const mappedFromDate = this._mapDateToInteger(fromDate)
      const mappedToDate = this._mapDateToInteger(toDate)
      const data = {roomType, fromDate: mappedFromDate, toDate: mappedToDate, guestEthAddress, personalInfo}
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
    const {fromDate} = this.state;
    const from = new Date(fromDate);
    const nextDate = from.setUTCDate(from.getUTCDate() + 1)
    const toDateMin = _formatDate(nextDate);
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
            <input className="form-control form-control-lg" id='twin' style={{display: 'inline-block', marginBottom: "5px"}} name="type" type="radio" value="twin" onChange={this.onRoomTypeChange}/>
          </Section>
          <Section>
            <label htmlFor='double' style={{marginRight: 8}}>Double Room</label>
            <input className="form-control form-control-lg" id='double' style={{display: 'inline-block', marginBottom: "5px"}} name="type" type="radio" value="double" onChange={this.onRoomTypeChange}/>
          </Section>
          <Section>
            <input className="form-control form-control-lg" style={{marginRight: '5px'}} type="date" min='2018-09-06' max='2018-09-09' onChange={this.onFromDateChange} value={fromDate}/>
            <input className="form-control form-control-lg" type="date" name="to" min={toDateMin} max='2018-09-10' onChange={this.onToDateChange}/>
          </Section>
          <Section>
            <label htmlFor='guestAddress' style={labelBlockStyle}>Guest Eth Address</label>
            <input className="form-control form-control-lg" id='guestAddress' style={{marginRight: '5px'}} type="text" onChange={this.onAddressChange}/>
          </Section>
          <Section>
              <div style={{display: 'inline-block', marginRight: 32}}>
                <label htmlFor='fullName' style={labelBlockStyle}>Full Name</label>
                <input className="form-control form-control-lg" id='fullName' style={{marginRight: '5px'}} type="text" onChange={this.onFullNameChange}/>
                <label htmlFor='birthDate' style={labelBlockStyle}>birth Date</label>
                <input className="form-control form-control-lg" id='birthDate' style={{marginRight: '5px'}} type="date" onChange={this.onBirthDateChange}/>
              </div>
                <div style={{display: 'inline-block'}}>
                <label htmlFor='email' style={labelBlockStyle}>Email</label>
                <input className="form-control form-control-lg" id='email' style={{marginRight: '5px'}} type="email" onChange={this.onEmailChange}/>
                <label htmlFor='phone' style={labelBlockStyle}>Phone Number</label>
                <input className="form-control form-control-lg" id='phone' style={{marginRight: '5px'}} type="tel" onChange={this.onPhoneChange}/>
              </div>
          </Section>
          <Section>
            <button className="form-control form-control-lg" type='submit' children='BOOK'/>
          </Section>
        </form>
      </div>
    );
  }
}

const Section = ({children}) => (
    <div style={{width: "100%", margin: 'auto', padding: 12}}>{children}</div>
)