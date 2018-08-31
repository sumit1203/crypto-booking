import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ImageSlider from '../../../ImageSlider';
import { roomType } from '../../propTypes';
import MarkdownRenderer from 'react-markdown-renderer';
import AnchorLink from 'react-anchor-link-smooth-scroll';

class Room extends React.Component {
  onClick = () => {
    const {room, onSelect} = this.props
    onSelect(room)
  }

  render () {
    const {roomIndex, room} = this.props;
    const {images, name, price, description, isFull, amenities, id, lifPrice, ethPrice} = room;
    return (
      <React.Fragment>

        <ImageSlider id={"carousel--"+id} images={images}/>

        <div className="card-img-overlay text-right d-block d-lg-none">
            <h5 className="h6 lead badge badge-warning">
              <b className="font--alt">{price} €</b><br/> Night
            </h5>
        </div>

        <div className="card-body">


          <header className="card-title">
          <h5 className="d-block d-lg-none">
            {roomIndex === 0 ? ' King-size Bed' : roomIndex === 1 && ' Twin Bed'}
          </h5>
            <div className="d-none d-lg-block">
              <div className="row align-items-center">
                <h4 className="col-sm-12 col-md-8">{roomIndex === 0 ? ' King-size Bed' : roomIndex === 1 && ' Twin Bed'}</h4>
                <div className="col-sm-12 col-md-4 text-md-right">
                  <span className="h5 lead">
                    <b className="font--alt">{price}€</b><span className="text-muted">/Night</span>
                  </span>
                </div>
              </div>
            </div>
          </header>


          <ul className="nav nav-tabs my-1" role="tablist">
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
              <MarkdownRenderer markdown={description} className="card-text text-left"/>
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
              <li> <b>Price in ETH</b>: <span className="font--alt">{ethPrice}</span>€<span className="text-muted">/Night</span> </li>
              <li> <b>Price in Lif</b>: <span className="font--alt">{lifPrice}</span>€<span className="text-muted">/Night</span> </li>
            </ul>
          </div>

        <div className="card-footer text-center text-md-left">

          <AnchorLink href="#book-a-room" className={classnames('btn btn-secondary mb-1 mb-md-0',{'disabled': isFull})}
            onClick={this.onClick}>
            Book <span className="d-md-none d-lg-inline">this room</span>
          </AnchorLink>

          <AnchorLink href="#paying-with-lif" className="d-block d-md-inline float-none float-md-right pl-0 pl-md-1">
            How to pay<br className="d-none d-md-block"/> with Lif?
          </AnchorLink>

          { isFull &&
            <p className="text-light full-room__message">
              <small>
                <em>
                  <i className="mdi mdi-28px mdi-information-outline"/>&nbsp;
                  Sorry, <span className="d-inline d-sm-none d-lg-inline">these </span> rooms <span className="d-inline d-sm-none d-lg-inline">these are </span> fully booked
                </em>
              </small>
            </p>
          }
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
