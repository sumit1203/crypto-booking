import React from 'react';
import LogoEB from '../../img/content/logo-ethberlin-alt.png';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default class HeroSection extends React.Component {
  render () {
    return (
      <article id="app-hero" className="bg--grad">
        <div className="section-wrapper py-md-3 py-lg-5">
          <div className="container py-0 py-md-1 py-lg-2">
            <div className="row justify-content-center text-center">
              <div className="col-sm-11 col-lg-10">
                <h1 className="mb-1 text-white h3 lead">
                  ETH Berlin accomodation service <span className="d-none">by Winding Tree</span>
                </h1>
                <p className="mb-2 text-white h1">
                  Book a room and save <span className="font--alt">20%</span> with Winding Tree
                </p>
                <AnchorLink href="#pick-room" className="btn btn-primary">
                  Book with discount
                </AnchorLink>
              </div>
            </div>
          </div>
        </div>

        <a
          className="hero__footer"
          href="https://ethberlin.com"
          target="_blank" rel="noopener noreferrer"
          title="Visit the oficial website."
        >
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <img src={LogoEB} className="hero__footer__logo d-block d-md-inline-block mx-auto mb-1 mb-md-0" width="150" alt="ETH Berlin"/>
                <span className="mx-1 h5 d-none d-md-inline hero__footer__logo__dot">•</span>
                <span className="h5 d-block d-sm-inline mb-sm-0">September 7 – 9, 2018</span>
                <span className="mx-1 h5 d-none d-sm-inline">//</span>
                <span className="h5 d-block d-sm-inline mb-sm-0">Berlin.</span>

                <span className="mx-1 mb-0 btn btn-sm btn-warning"><span className="d-md-none">Visit&nbsp;</span>Website</span>
              </div>
            </div>
          </div>
        </a>

      </article>
    )
  }

}