import React from 'react'

import LogoEB from '../../img/content/logo-ethberlin.png'

export default class HeroSection extends React.Component {
  render () {
    return (
      <article className="bg--gradient" style={{position: 'relative'}}>
        <div style={{
          opacity: .6,
          position: 'absolute',
          top: '0', left: '0', bottom: '0', right: '0',
          backgroundImage: 'url(https://windingtree.com/assets/img/banners/lif-token-bg.svg)',
          backgroundPosition: 'right center, left center',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: 'contain, auto',
        }}></div>
        <div className="section-wrapper py-md-3 py-lg-5" style={{position: 'relative', zIndex: 10}}>
          <div className="container py-0 py-md-1 py-lg-2">
            <div className="row justify-content-center text-center">
              <div className="col-sm-11 col-lg-10">
                <h3 className="mb-1 text-white lead">
                  ETH Berlin accomodation service
                </h3>
                <p className="mb-2 text-white h1">
                  Book a room and save <span className="font--alt">20%</span> with Winding Tree
                </p>
                <a href="#pick-room" className="btn btn-primary btn-lg">
                  <span>Book with discount</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <a className="bg-white block-shadow d-block" style={{padding: '21px 0 18px 0', position: 'relative'}} href="https://ethberlin.com"
           title="Visit the oficial website.">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <img src={LogoEB} width="150" alt="ETH Berlin" style={{position: 'relative', top: -4}}/>
                <span className="mx-1 h5">•</span>
                <span className="h5"><b>Berlin, Germany</b></span>
                <span className="mx-1 h5">•</span>
                <span className="h5">September 7-10, 2018</span>
              </div>
            </div>
          </div>
        </a>
      </article>
    )
  }

}