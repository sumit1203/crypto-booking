import React from 'react';

// import lifToken from 'windingtree-media-web/custom-icons/svg/wt-icon--lif-token.svg';
import payment from 'windingtree-media-web/custom-icons/svg/wt-icon--payment.svg';
import ReCAPTCHA from "react-google-recaptcha";

export default class RoomBooking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalConfirm: false,
      modalRules: false,
      priceUSD: 350,
    };
  }

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

    var {modalConfirm, modalRules, priceUSD} = this.state;

    return (

      <article id='BookARoom' className="section-wrapper bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">

              <header className="text-center">
                <h2 className="mb-1">Book a Room</h2>
                <p className="lead h4 mb-2">
                    All rooms offered to book only within ETH Berlin Dates 6.09 - 10.09
                </p>
              </header>
              <form onSubmit={onSubmit}>

                {/* ROOM TYPE */}
                {/*
                    NOTE: in case one of the options is unavailable use the class "disabled"
                    and the attribute "disabled" on that item
                */}
                <section className="text-center mb-2">
                  <h5 className="mb-1"> Preffered room type </h5>
                  <div className="btn-group btn-group--switch" role="group" aria-label="Room type">
                    <input id="twin" name="type" type="radio" value="twin" onChange={onRoomTypeChange} required defaultChecked={true}/>
                    <label htmlFor="twin" className="col-6"> Twin Room </label>
                    <input id="double" name="type" type="radio" value="twin" onChange={onRoomTypeChange} required/>
                    <label htmlFor="double" className="col-6"> Double Room </label>
                  </div>
                  {/* NOTE: Change the messages depending on room availability */}
                  {/* <p>* Only Tween rooms are available</p> */}
                </section>

                <section className="text-center mb-2">
                  <h5 className="mb-1"> Reservation date </h5>
                  <div className="form-row">
                    <div className="col-12 col-sm-6 mb-1 mb-sm-0">
                      <input className="form-control form-control-lg" type="date" min="2018-09-06" max="2018-09-09" onChange={onFromDateChange} value={from} required/>
                    </div>
                    <div className=" col-12 col-sm-6">
                      <input className="form-control form-control-lg" type="date" name="to" min={toDateMin} max="2018-09-10" onChange={onToDateChange} required/>
                    </div>
                  </div>
                </section>

                <div className="card bg-white block-shadow mb-2">

                  <h5 className="px-2 py-2"> Guest information </h5>

                  <section className="row text-center px-2 pb-2">
                    <div className="col text-left">
                      <label htmlFor="fullName"> <b>Full Name</b> </label>
                      <input className="form-control form-control-lg mb-1" id="fullName" type="text" onChange={onFullNameChange} placeholder='Pedrotti Capone' required/>
                      <label htmlFor="birthDate"> <b>Birth Dat</b>e </label>
                      <input className="form-control form-control-lg" id="birthDate" type="date" onChange={onBirthDateChange} />
                    </div>

                    <div className="col text-left">
                      <label htmlFor="email"> <b>Email</b> </label>
                      <input className="form-control form-control-lg mb-1" id="email" type="email" onChange={onEmailChange} placeholder='someGuy@windingtree.com' required/>
                      <label htmlFor="phone"> <b>Phone Number</b> </label>
                      <input className="form-control form-control-lg" id="phone" type="tel" onChange={onPhoneChange} placeholder='+54 011 1135989272'/>
                    </div>
                  </section>

                </div>

                <section className="text-center">

                  {/* FINAL PRICE */}
                  {/* NOTE: This should be visible after selecting the dated for the reservation */}
                  <div className="mb-1">
                    <p style={{marginBottom: -5}}> <small>Final price:</small></p>
                    <div>
                      <span className="h2">$<span className="h1 font--alt">{priceUSD}</span></span>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg" type="submit" onClick={
                      (e)=>{
                        e.preventDefault();
                        modalConfirm ?
                          this.setState({modalConfirm: false})
                          : this.setState({modalConfirm: true})
                      }
                    }
                    > BOOK </button>
                    <br/>
                    <button style={{marginTop: '0.5em'}} className="btn btn-sm btn-link btn-light text-dark" onClick={
                      (e)=>{
                        e.preventDefault();
                        modalRules ?
                          this.setState({modalRules: false})
                          : this.setState({modalRules: true})
                      }
                    }>
                      Hotel rules
                    </button>
                </section>

              </form>
            </div>
          </div>
        </div>



        <div className="modal" id="modalConfirm" tabIndex="-1" role="dialog" style={modalConfirm ? {display: 'block', position: 'static'} : {}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm the reservation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <i className="mdi mdi-close"></i>
                </button>
              </div>

              <div className="modal-body">

                <p className="mb-1"> Select your preffered paymen method.</p>

                <div className="row mb-1">
                  <div className="col-sm-8">
                    <div className="row no-gutters mb-1">
                      <div className="col-4">
                        <img src={payment} style={{position: 'relative', right: -30}} alt="icon" width="100" className="img-fluid"/>
                      </div>
                      <div className="col-8">
                        <div className="form-check" style={{marginBottom: '0.3em', paddingTop: 7}}>
                          <input className="form-check-input" style={{position: 'relative', top: 2, marginRight: 5}} type="radio" name="pay-eth" id="pay-eth" value="ETH" defaultChecked={true}/>
                          <label className="form-check-label" htmlFor="payment-method">
                            <b>Ether</b>
                          </label>
                        </div>
                        <div className="form-check disabled">
                          <input className="form-check-input" style={{position: 'relative', top: 2, marginRight: 5}} type="radio" name="pay-lif" id="pay-lif" value="LIF" disabled/>
                          <label className="form-check-label" htmlFor="payment-method">
                            <b>Lif</b> (soon)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div style={{marginTop: -10}}>
                      <p> <small>Final price:</small></p>
                      <div className="badge badge-light px-1"><span className="h3">$<span className="h2 font--alt">{priceUSD}</span></span></div>.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <p className="mb-1">
                     Provide the address from which you will pay.
                    </p>

                    <div className="mb-1 px-1">
                      <div className="form-group form-row mb-0">
                          <label htmlFor="guestAddress" className="col-md-4 col-lg-3 col-form-label col-form-label-lg">
                            <b>Your Address</b>
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              id="guestAddress"
                              className="form-control form-control-lg w-100"
                              style={{width: 450}}
                              onChange={onAddressChange} placeholder='0xe99356bde974bbe08721d77712168fa070aa8da2'
                              required
                            />
                          </div>
                      </div>
                    </div>

                  </div>
                </div>
                {/* TODO replace the sitekey when we register a domain for the app */}
                  <ReCAPTCHA className='' sitekey='xxxxxxxxx' theme='light' onChange={(a) => console.log(a, 'called')}/>
              </div>


              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary">Confirm</button>

                {/*
                  NOTE: After confirming
                  Thank you, you will get booking confirmation and payment detais on your email.
                */}
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="modalRules" tabIndex="-2" role="dialog" style={modalRules ? {display: 'block', position: 'static'} : {}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Hotel i<span className="font--alt">·31</span></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <i className="mdi mdi-close"></i>
                </button>
              </div>

              <div className="modal-body">

                <p className="mb-1">These are th hotel rules:</p>

                <ul>
                  <li>
                    <b>Check in time</b>: 12-00
                  </li>
                  <li>
                    <b>Check out time</b>: 11-00
                  </li>
                  <li>
                    <b>Breakfast</b>: included
                  </li>
                  <li>
                    <b>Pets allowed</b>: no
                  </li>
                  <li>
                    <b>Hotel phone</b>: +49 12 3234 654
                  </li>
                  <li>
                    <b>Hotel address</b>: Berlin, strasse ..
                  </li>
                </ul>


              </div>


              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Accept</button>
              </div>
            </div>
          </div>
        </div>


      </article>
    );
  }
}

