import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
              <b>{price * 0.8} €/Night</b>
            </small>
          </h5>
          <hr className="my-1"/>
          <p className="card-text">
            {description}
          </p>

          <p> <b>Price in ETH</b>: {price}€/night </p>
          <p> <b>Price in Lif</b>: {price * 0.8}€/night </p>

          <a href="#book-a-room" className={classnames('btn btn-secondary',  'mt-1',{'disabled': isFull})}
            style={isFull ? {textDecoration: 'line-through', opacity: 0.5}: {}}
            onClick={this.onClick}>
            Book this room
          </a>
          <a href="#paying-with-lif" className="float-right mt-1 pl-1 border-left">
            How to pay<br/> with Lif?
          </a>
          <p style={{marginTop: 5}}>
            <small>
              <em>{isFull && 'Sorry, these rooms are fully booked'}</em>
            </small>
          </p>
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
