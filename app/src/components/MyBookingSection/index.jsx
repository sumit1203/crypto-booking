import React from 'react';

export default class MyBookingSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailValid: false,
    };
  }

  render() {

    const self = this;
    let {emailValid} = this.state;

    function onEmailChange() {
      // if valid
      self.setState({emailValid: true});
    }


    return (
      <article className="py-3 py-md-5 border-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">

              <h2 className="mb-1"> My Booking </h2>
              <p className="mb-2"> Please enter the data below. </p>

              <form>
                <div className="form-group text-left">
                  <label htmlFor="userEmail"> <b>Full Name</b> </label>
                  <input className="form-control form-control-lg mb-2"
                    id="userEmail"
                    type="text"
                    onChange={onEmailChange}
                    placeholder="Pedrotti Capone"
                    autoComplete="off"
                    required
                  />

                  { emailValid &&
                    <div>
                      <label htmlFor="userBookingHash"> <b>Booking hash</b> </label>
                      <input className="form-control form-control-lg mb-2"
                        id="userBookingHash"
                        placeholder="Booking hash"
                        autoComplete="off"
                        type="text"
                        required
                      />

                      <label htmlFor="userSecretKey"> <b>Secret key</b> </label>
                      <input className="form-control form-control-lg mb-2"
                        id="userSecretKey"
                        placeholder="Secret key"
                        autoComplete="off"
                        type="text"
                        required
                      />
                    </div>
                  }
                </div>
                {/*
                  TODO:
                    Captcha will be displayed here after the previows data is entered, as the example above.
                    <Captcha/>
                */}

                <button className="btn btn-primary btn-lg" type="submit"> Retrieve booking data </button>
              </form>

            </div>
          </div>
        </div>

        {/* MODAL GENERIC MESSAGES */}
        <div className="modal" id="modalMessage" tabIndex="-2" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">We sent you a message</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <i className="mdi mdi-close"></i>
                </button>
              </div>

              <div className="modal-body">
                <p className="mb-1">Please check your email.</p>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div>

      </article>
    )
  }
}
