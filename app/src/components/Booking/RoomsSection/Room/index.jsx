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
    return (
      <React.Fragment>
        <img className="card-img-top" src={images[0]} alt="Card image cap"/>
        <div className="card-img-overlay text-right d-block d-lg-none">
            <h5 className="h6 lead badge badge-warning">
              <b className="font--alt">{price * 0.8} €</b><br/> Night
            </h5>
        </div>

        <div className="card-body">


          <header className="card-title">
          <h5 className="d-block d-lg-none">
            {name}
          </h5>
            <div className="d-none d-lg-block">
              <div className="row align-items-center">
                <div className="col-sm-12 col-md-8 h5">{name}</div>
                <div className="col-sm-12 col-md-4 text-md-right">
                  <span className="h6 lead">
                    <b className="font--alt">{price * 0.8} €</b> /Night
                  </span>
                </div>
              </div>
            </div>
          </header>

          <hr className="my-1"/>

          <p className="card-text">
            {description}
          </p>

          <p className="card-text mt-1 mb-0"> <b>Price in ETH</b>: {price}€/night </p>
          <p className="card-text"> <b>Price in Lif</b>: {price * 0.8}€/night </p>

        </div>


        <div className="card-footer text-left">

          <a href="#book-a-room" className={classnames('btn btn-secondary mb-1 mb-md-0',{'disabled': isFull})}
            style={isFull ? {textDecoration: 'line-through', opacity: 0.5}: {}}
            onClick={this.onClick}>
            Book <span className="d-md-none d-lg-inline">this room</span>
          </a>
          <a href="#paying-with-lif" className="d-block d-md-inline float-none float-md-right pl-0 pl-md-1">
            How to pay<br className="d-none d-md-block"/> with Lif?
          </a>
          <p className="w-100  text-light" style={{marginTop: 35, position: 'absolute'}}>
            { isFull &&
              <small>
                <em>
                  <i className="mdi mdi-28px mdi-information-outline"/>&nbsp;
                  Sorry, <span className="d-inline d-sm-none d-lg-inline">these </span> rooms <span className="d-inline d-sm-none d-lg-inline">these are </span> fully booked
                </em>
              </small>
            }
          </p>
        </div>
      </React.Fragment>

    )
  }
}

Room.propTypes = {
  room: roomType,
  onSelect: PropTypes.func
}

export default Room
