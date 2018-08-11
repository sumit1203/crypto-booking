import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import HotelMap from '../Map';

export default class Hotel extends React.Component {

  render() {

    const {name, description, url, hotelLocation} = this.props;

    return (
      <article className="section-wrapper bg--gradient-toright pt-4 pb-3 text-center text-md-left"
      style={{
        borderBottom: '1px solid rgba(255,255,255,.2)'
      }}
      >
        <div className="container">

          <div className="row flex-column flex-md-row align-items-center">
            <div className="col-sm-12 col-md-5 col-lg-8 mb-1 mb-md-0">
              <h2 className="mb-1 text-white"> {name} </h2>
              <MarkdownRenderer markdown={description} className="text-white mb-1"/>
              <p className="text-white">
                <b>For more info please check</b>
                <a className="ml-1 btn btn-sm btn-secondary" href={url}>&nbsp;{url}</a>
              </p>
          </div>
          <div className="col-sm-12 col-md-7 col-lg-4 text-center">
            <div className="mb-2 mt-2 mt-md-1 mb-md-1" style={{position: 'relative', width: "100%", height: 300}}>
              <HotelMap hotelLocation={hotelLocation} hotelName={name} />
            </div>
            <AnchorLink href="#pick-room" className="btn btn-outline-light">
              Pick a room
            </AnchorLink>
          </div>
        </div>

        </div>
      </article>
    );

  }

}