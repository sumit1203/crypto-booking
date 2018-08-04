import React from 'react'
import PropTypes from 'prop-types'
import Room from './Room'

import {roomType} from '../propTypes'

class RoomsSection extends React.Component {
  render () {
    const {roomTypes, onRoomTypeChange} = this.props
    return (
      <article id="pick-room" className="section-wrapper bg--gradient-toright pt-1 pb-4 text-center text-md-left">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-white my-2 h3 pt-2 pt-lg-0">
                Rooms for hackers with discount
              </h2>
            </div>
          </div>
          <div className="card-deck">
            {roomTypes.map(room => (
              <div key={room.id} className="card mx-1">
                <Room room={room} onSelect={onRoomTypeChange}/>
              </div>
            ))
            }
          </div>
        </div>
      </article>
    )
  }
}

RoomsSection.propTypes = {
  onRoomTypeChange: PropTypes.func.isRequired,
  roomTypes: PropTypes.arrayOf(roomType).isRequired
}

export default RoomsSection
