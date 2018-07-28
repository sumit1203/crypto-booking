import React from 'react';
import PropTypes from 'prop-types';

const Room = ({imgSrc, name, price, description, isFull}) => (
    <div className="card mr-1">
        <img className="card-img-top" src={imgSrc} alt="Card image cap" />
        <div className="card-body p-2">
            <h5 className="card-title h4">
                {name}
                <small className="float-right">
                    <b>
                        ${price*0.8}/Night
                    </b>
                </small>
            </h5>
            <hr className="my-1" />
            <p className="card-text">
                {description}
            </p>
            <p>
                <b>
                    Price in USD
                </b>
                : {price}$/night
            </p>
            <p>
                <b>
                    Price in Lif
                </b>
                : {price*0.8}$/night
            </p>
            <a href="#BookARoom" className="btn  btn-secondary mt-1">
                {isFull ? 'these rooms are fully booked' : 'Book this room'}
            </a>
            <a href="#" className="float-right mt-2">
                How to pay with Lif
            </a>
        </div>
    </div>
);

Room.propTypes = {
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    isFull: PropTypes.bool
}

export default Room;
