import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import $ from 'jquery'

class ImageSlider extends React.Component {
  componentDidMount () {
    const {id} = this.props
    $(`#${id}`).carousel('cycle')
  }

  render () {
    const {images, id, className} = this.props
    return (
      <div id={id} className={classnames("carousel", "slide", className)} data-ride="carousel">
        <ol className="carousel-indicators">
          {images.map((image, index) => (<li key={index} className={!index ? 'active': ''} data-target={`#${id}`} data-slide-to={index}/>))}
        </ol>
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div key={index} className={`carousel-item ${!index ? 'active' : ''}`}>
              <img className="d-block w-100 h-100" src={image} alt={`slide ${index}`}/>
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href={`#${id}`} role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"/>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href={`#${id}`} role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"/>
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
  }
}

ImageSlider.propTypes = {
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string
}

export default ImageSlider