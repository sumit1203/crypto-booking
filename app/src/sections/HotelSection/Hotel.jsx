import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from 'react-markdown-renderer';
import HotelMap, { hotelLocationType } from '../../components/Map';

const Hotel = (props) => {
  const {
    name, description, url, hotelLocation,
  } = props;

  return (
    <article id="hotel-section" className="section-wrapper bg--grad pt-2 pb-2 text-center text-md-left">
      <div className="container">

        <div className="row flex-column flex-md-row align-items-center">

          <div className="col-sm-12 col-md-5 col-lg-7 mb-1 mb-md-0">
            <h2 className="mb-1 text-white hotel-name">
              {name}
            </h2>
            <MarkdownRenderer markdown={description} className="text-white h4 lead mb-1 hotel-info" />
            <p className="text-white">
              <b>
                For more info please check
              </b>
              <a
                className="ml-sm-1 ml-md-0 ml-lg-1 btn btn-sm btn-secondary"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
            </p>
          </div>

          <div className="col-sm-12 col-md-7 col-lg-5 text-center">
            <div className="mb-2 mt-2 mt-md-1 mb-md-1 map-container float-none  float-md-right">
              <HotelMap hotelLocation={hotelLocation} hotelName={name} />
            </div>
          </div>
        </div>

      </div>
    </article>
  );
};

Hotel.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  hotelLocation: hotelLocationType.isRequired,
};

export default Hotel;
