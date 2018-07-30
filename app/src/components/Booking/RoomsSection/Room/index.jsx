import React from 'react'
import PropTypes from 'prop-types'
import { roomType } from '../../propTypes'

class Room extends React.Component {
  onClick = () => {
    const {room, onSelect} = this.props
    onSelect(room)
  }
  render () {
    const {images, name, price, description, isFull} = this.props.room
    return (<div className="card mr-1">
        <img className="card-img-top" src={images[0]} alt="Card image cap"/>
        <div className="card-body p-2">
          <h5 className="card-title h4">
            {name}
            <small className="float-right">
              <b>${price * 0.8}/Night</b>
            </small>
          </h5>
          <hr className="my-1"/>
          <p className="card-text">
            {description}
          </p>
          <p>
            <b>Price in EUR</b>: {price}$/night
          </p>
          <p>
            <b>Price in Lif</b>: {price * 0.8}$/night
          </p>
          <a href="#book-a-room" className="btn  btn-secondary mt-1" onClick={this.onClick}>
            {isFull ? 'these rooms are fully booked' : 'Book this room'}
          </a>
          <a href="#" className="float-right mt-2">
            How to pay with Lif
          </a>
        </div>
      </div>

    )
  }
}

Room.propTypes = {
  room: roomType,
  onSelect: PropTypes.func
}

export default Room
