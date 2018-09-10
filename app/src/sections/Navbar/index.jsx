import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Navbar = () => (
  <nav className="navbar navbar-light bg-white navbar-expand-lg" id="navbar" style={{ opacity: 1 }}>
    <div className="container">
      <a href="https://windingtree.com" target="_blank" rel="noopener noreferrer" className="navbar-brand d-block">
        Winding Tree
      </a>
      <button
        className="navbar-toggler px-0 border-0"
        id="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="mdi mdi-24px mdi-menu" />
      </button>

      <div className="collapse navbar-collapse" id="navbar-content">
        <ul className="navbar-nav ml-auto" id="navbar-nav">

          <li className="nav-item h5">
            <AnchorLink href="#paying-with-lif" className="nav-link">
              Paying with Lif
            </AnchorLink>
          </li>
          <li className="nav-item h5">
            <AnchorLink href="#my-booking" className="nav-link">
              My Booking
            </AnchorLink>
          </li>

        </ul>
      </div>

    </div>
  </nav>
);

export default Navbar;
