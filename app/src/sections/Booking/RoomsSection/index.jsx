import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Room from './Room';

import { roomType } from '../propTypes';

const RoomsSection = (props) => {
  const { roomTypes, onRoomTypeChange, isBookingDisabled } = props;
  return (
    <article id="pick-room" className="section-wrapper bg-light pt-0 pb-0 pb-md-1 pb-lg-2 text-center text-md-left">
      <header>
        <div className="container">
          <div className="row flex-column flex-md-row align-items-center">
            <div className="col-sm-8">
              <h3 className="h4 text-dark mb-1 mb-md-0">
                Rooms for hackers with discount
              </h3>
            </div>
            <div className="col-sm-4 text-center">
              <AnchorLink href="#pick-room" className="btn btn-outline-dark">
                Pick a room
              </AnchorLink>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="py-3 card-deck">
          {roomTypes.map((room, index) => (
            <div key={room.id} className={`card ${room.isFull ? 'full-room' : ''}`}>
              <Room
                room={room}
                roomIndex={index}
                onSelect={onRoomTypeChange}
                isBookingDisabled={isBookingDisabled}
              />
            </div>
          ))
          }
        </div>
      </div>
    </article>
  );
};

RoomsSection.propTypes = {
  onRoomTypeChange: PropTypes.func.isRequired,
  roomTypes: PropTypes.arrayOf(roomType).isRequired,
  isBookingDisabled: PropTypes.bool.isRequired,
};

export default RoomsSection;
