import React from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3';
import CopyInput from '../CopyInput';

const Transaction = ({
  to, gas, data, value,
}) => (
  <div className="p-1">
    <div>
      <b>
        To:
      </b>
      <CopyInput className="font--alt" value={to} readOnly />
    </div>
    {!!value && (
    <div>
      <b>
          Amount:
      </b>
      <CopyInput className="font--alt" value={parseFloat(web3.utils.fromWei(value)).toFixed(4)} readOnly />
    </div>
    )}
    <div>
      <b>
        Recommended Gas:
      </b>
      <CopyInput className="font--alt" value={gas} readOnly />
    </div>
    <div>
      <b>
        Data:
      </b>
      <CopyInput className="font--alt" value={data} readOnly />
    </div>
  </div>
);

export const transactionType = {
  to: PropTypes.string.isRequired,
  gas: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Transaction.propTypes = transactionType;

export default Transaction;
