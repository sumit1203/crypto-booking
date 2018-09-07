import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import logoEB from '../../img/content/logo-ethberlin-bw.png';
import logoI31 from '../../img/content/logo-hotel-i-31-bw.jpg';
import logoWTmd from '../../../node_modules/windingtree-media-web/logo-variants/full-logo/svg/logo--white_white-text--md.svg';
import logoWTsm from '../../../node_modules/windingtree-media-web/logo-variants/sign/svg/sign--white_white-text--sm.svg';

const Footer = () => (
  <footer className="footer bg--purple text-white">
    <div className="container">

      <div className="pt-2 pb-1">

        <div className="row">

          <div className="col-md-4">
            <img src={logoWTsm} alt="Winding Tree" className="d-md-none mb-2"/>
            <img src={logoWTmd} height="60" alt="Winding Tree" className="d-none d-md-inline"/>
          </div>

          <div className="col-md-8">
            <div className="row">

              <div className="col-6 col-sm-6 col-md-6 col-lg-8">
                <nav className="nav flex-column small mb-1">
                  <AnchorLink href="#book-a-room" className="nav-link px-0 text-white text--alpha-inverse">Book a room</AnchorLink>
                  <AnchorLink href="#paying-with-lif" className="nav-link px-0 text-white text--alpha-inverse">Paying with Lif</AnchorLink>
                  <AnchorLink href="#my-booking" className="nav-link px-0 text-white text--alpha-inverse">My booking</AnchorLink>
                </nav>
              </div>

              <div className="col-6 col-sm-6 col-md-6 col-lg-4">
                <div className="row">
                  <div className="col-8">
                    <a href="https://ethberlin.com" target="_blank" rel="noopener noreferrer" className="nav-link px-0 text--alpha-inverse">
                      <img src={logoEB} alt="ETH Berlin" className="img-fluid"/>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="https://www.hotel-i31.de" target="_blank" rel="noopener noreferrer" className="nav-link px-0 text--alpha-inverse">
                      <img src={logoI31} alt="I-31 Hotel" className="img-fluid"/>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <hr className="text--alpha"/>

      <div className="py-1">
        <div className="d-flex flex-column-reverse flex-md-row align-items-center">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-baseline">
            <small>©&nbsp;2017–<script>document.write(new Date().getFullYear());</script>2018, Winding Tree</small>
          </div>

          <div className="mb-1 mb-md-0 ml-md-auto">
            <ul className="social list-inline text-center text-md-right">

              <li className="list-inline-item">
                <a href="https://github.com/windingtree" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-github-circle"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="https://twitter.com/windingtree" target="_blank" rel="noopener noreferrer" title="Twitter" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-twitter"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="http://blog.windingtree.com/" target="_blank" rel="noopener noreferrer" title="Medium" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-medium"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="https://www.youtube.com/channel/UCFuemEOhCfenYMoNdjD0Aew" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-youtube"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="https://t.me/windingtree" target="_blank" rel="noopener noreferrer" title="Telegram" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-telegram"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="https://reddit.com/r/windingtree" target="_blank" rel="noopener noreferrer" title="Reddit" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-reddit"></i>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="https://bitcointalk.org/index.php?topic=1946065" target="_blank" rel="noopener noreferrer" title="BitcoinTalk" className="text-white text--alpha">
                  <i className="mdi mdi-24px mdi-bitcoin"></i>
                </a>
              </li>

            </ul>


          </div>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
