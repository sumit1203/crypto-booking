import React from 'react';

export default class RoomBooking extends React.Component {
  render() {
    const labelBlockStyle = { display: 'block', fontWeight: 'bold' };
    const {
      toDateMin,
      from,
      onRoomTypeChange,
      onFromDateChange,
      onToDateChange,
      onAddressChange,
      onFullNameChange,
      onBirthDateChange,
      onEmailChange,
      onPhoneChange,
      onSubmit,
    } = this.props;
    return (
      <article id='BookARoom' className="section-wrapper bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>
                  Book a Room
              </h2>
              <p>
                  All rooms offered to book only within ETH Berlin Dates: 6.09 - 10.09
              </p>
              <form onSubmit={onSubmit}>
                <Section>
                  <label htmlFor="twin" style={{ marginRight: 8 }}>
                      Twin Room
                  </label>
                  <input className="form-control form-control-lg" id="twin" style={{ display: 'inline-block', marginBottom: '5px' }} name="type" type="radio" value="twin" onChange={onRoomTypeChange} required/>
                </Section>
                <Section>
                  <label htmlFor="double" style={{ marginRight: 8 }}>
                      Double Room
                  </label>
                  <input className="form-control form-control-lg" id="double" style={{ display: 'inline-block', marginBottom: '5px' }} name="type" type="radio" value="double" onChange={onRoomTypeChange} />
                </Section>
                <Section>
                  <input className="form-control form-control-lg" style={{ marginRight: '5px' }} type="date" min="2018-09-06" max="2018-09-09" onChange={onFromDateChange} value={from} required/>
                  <input className="form-control form-control-lg" type="date" name="to" min={toDateMin} max="2018-09-10" onChange={onToDateChange} required/>
                </Section>
                <Section>
                  <label htmlFor="guestAddress" style={labelBlockStyle}>
                      Guest Eth Address
                  </label>
                  <input className="form-control form-control-lg" id="guestAddress" style={{ marginRight: '5px' }} type="text" onChange={onAddressChange} placeholder='0xe99356bde974bbe08721d77712168fa070aa8da2' required/>
                </Section>
                <Section>
                  <div style={{ display: 'inline-block', marginRight: 32 }}>
                    <label htmlFor="fullName" style={labelBlockStyle}>
                        Full Name
                    </label>
                    <input className="form-control form-control-lg" id="fullName" style={{ marginRight: '5px' }} type="text" onChange={onFullNameChange} placeholder='Pedrotti Capone' required/>
                    <label htmlFor="birthDate" style={labelBlockStyle}>
                        birth Date
                    </label>
                    <input className="form-control form-control-lg" id="birthDate" style={{ marginRight: '5px' }} type="date" onChange={onBirthDateChange} />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <label htmlFor="email" style={labelBlockStyle}>
                        Email
                    </label>
                    <input className="form-control form-control-lg" id="email" style={{ marginRight: '5px' }} type="email" onChange={onEmailChange} placeholder='someGuy@windingtree.com' required/>
                    <label htmlFor="phone" style={labelBlockStyle}>
                        Phone Number
                    </label>
                    <input className="form-control form-control-lg" id="phone" style={{ marginRight: '5px' }} type="tel" onChange={onPhoneChange} placeholder='+54 011 1135989272'/>
                  </div>
                </Section>
                <Section>
                  <button className="btn btn-primary" type="submit">
                      BOOK
                  </button>
                </Section>
              </form>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

const Section = ({ children }) => (
  <div style={{ width: '100%', margin: 'auto', padding: 12 }}>
    {children}
  </div>
);
