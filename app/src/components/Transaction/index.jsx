import React from 'react'
import PropTypes from 'prop-types'
import CopyInput from '../CopyInput'

const Transaction = ({to, gas, data, value}) => (
  <div className="p-1">
    <p><b>To:</b> <CopyInput className="font--alt" value={to} readOnly/></p>
    {!!value && <p><b>Amount:</b> <CopyInput className="font--alt" value={value} readOnly/></p>}
    <p><b>Recommended Gas:</b> <CopyInput className="font--alt" value={gas} readOnly/></p>
    <p>
      <b>Data:</b> <CopyInput className="font--alt" value={data} readOnly/>
    </p>
  </div>
)

export const transactionType = {
  to: PropTypes.string.isRequired,
  gas: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  value: PropTypes.string
}

Transaction.propTypes = transactionType

export default Transaction