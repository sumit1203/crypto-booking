import React from 'react';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-white navbar-expand-lg XXXnavbar--toggle-bg" id="navbar" style={{opacity: 1}}>
        <div className="container">

          <a href="https://windingtree.com" className="navbar-brand d-block">Winding Tree</a>

          <button className="navbar-toggler px-0 border-0" id="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
            <i className="mdi mdi-24px mdi-menu"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="navbar-nav ml-auto" id="navbar-nav">

              <li className="nav-item h5">
                <a href="/" className="nav-link">
                Paying with Lif
                </a>
              </li>
              <li className="nav-item h5">
                <a href="/" className="nav-link">
                My Booking
                </a>
              </li>
              <li className="nav-item h5">
                <a href="/" className="nav-link">
                FAQ
                </a>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    )
  }
}
