import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ImageSlider from '../../../ImageSlider'
import { roomType } from '../../propTypes'

class Room extends React.Component {
  onClick = () => {
    const {room, onSelect} = this.props
    onSelect(room)
  }

  render () {
    const {images, name, price, description, isFull, amenities} = this.props.room;
    const roomIndex = this.props.roomIndex;
    return (
      <React.Fragment>
        <ImageSlider id={id} images={images}/>
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
                <h4 className="col-sm-12 col-md-8">{name}</h4>
                <div className="col-sm-12 col-md-4 text-md-right">
                  <span className="h5 lead">
                    <b className="font--alt">{price * 0.8}€</b><span className="text-muted">/Night</span>
                  </span>
                </div>
              </div>
            </div>
          </header>


          <ul className="nav nav-tabs my-1" id="myTab" role="tablist" style={{position: 'relative'}}>
            <li className="nav-item">
              <a className="nav-link active" id={"description-tab-"+roomIndex} data-toggle="tab" href={"#description-"+roomIndex} role="tab" aria-controls="description" aria-selected="true">
                Description
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id={"amenities-tab-"+roomIndex} data-toggle="tab" href={"#amenities-"+roomIndex} role="tab" aria-controls="amenities" aria-selected="false">
                amenities
              </a>
            </li>
          </ul>

          <div className="tab-content" id="tab-content">
            <div className="tab-pane fade show active" id={"description-"+roomIndex} role="tabpanel" aria-labelledby="description-tab">
              <p className="card-text text-left">
                {description}
              </p>
            </div>
            <div className="tab-pane fade" id={"amenities-"+roomIndex} role="tabpanel" aria-labelledby="amenities-tab">
              <ul className="pl-1">
                { amenities.map((item, index) => (
                  <li key={index+item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>


          <div className="card-footer text-left bg-white">
            <ul className="list-unstyled">
              <li> <b>Price in ETH</b>: <span className="font--alt">{price}</span>€<span className="text-muted">/Night</span> </li>
              <li> <b>Price in Lif</b>: <span className="font--alt">{price * 0.8}</span>€<span className="text-muted">/Night</span> </li>
            </ul>
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
