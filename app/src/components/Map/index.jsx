import React from 'react';
import PropTypes from 'prop-types';

import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const ZOOM = 35;

const LeafletMap = (props) => {
  const { hotelName, hotelLocation } = props;
  const position = [hotelLocation.latitude, hotelLocation.longitude];

  return (
    <Map center={position} zoom={ZOOM}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className="map-popup">
            <h4>
              {hotelName}
            </h4>
            <p>
                Invalidenstraße 31
            </p>
            <p>
                zbrBerlin 10115
            </p>
            <p>
                Tel +49 30 965 357 000
            </p>
          </div>
        </Popup>
      </Marker>
    </Map>
  );
};

export const hotelLocationType = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

LeafletMap.propTypes = {
  hotelName: PropTypes.string.isRequired,
  hotelLocation: hotelLocationType.isRequired,
};

export default LeafletMap;
