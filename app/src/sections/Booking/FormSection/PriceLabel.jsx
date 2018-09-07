import React from 'react'
import PropTypes from 'prop-types'

const PriceLabel = ({value}) => (
  <div className="mb-1">
    <p><small>Final Price</small></p>
    <span className="h2">$<span className="h1 font--alt">{value}</span></span>
  </div>
)

PriceLabel.propTypes = {
  value: PropTypes.number
}

export default PriceLabel