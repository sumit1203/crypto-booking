import React from 'react'
import PropTypes from 'prop-types'

const PriceLabel = ({value}) => (
  <div className="mb-1">
    <p style={{marginBottom: -5}}> <small>Final price:</small></p>
    <div>
      <span className="h2">$<span className="h1 font--alt">{value}</span></span>
    </div>
  </div>
)

PriceLabel.propTypes = {
  value: PropTypes.string
}

export default PriceLabel