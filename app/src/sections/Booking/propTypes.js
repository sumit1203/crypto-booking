import PropTypes from 'prop-types'

export const roomType = PropTypes.shape({
  id: PropTypes.string,
  isFull: PropTypes.bool,
  description: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  lifPrice: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
})