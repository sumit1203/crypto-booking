import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default class LeafletMap extends Component {
  state = {
    zoom: 35,
  }

  render() {
    const { hotelName, hotelLocation } = this.props;
    const position = [hotelLocation.latitude, hotelLocation.longitude];

    return (
      <Map center={position} zoom={this.state.zoom} style={{height: 300}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <div className="map-popup">
              <h4>{hotelName}</h4>
              <p>Invalidenstraße 31</p>
              <p>zbrBerlin 10115</p>
              <p>Tel +49 30 965 357 000</p>
            </div>
          </Popup>
        </Marker>
      </Map>
    )
  }
}