import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const IS_AVAILABLE = 'available';
const IS_FULL = 'full';

const AvailabilityLabel = ({ status }) => {
  let className;
  let message;
  switch (status) {
    case IS_AVAILABLE: {
      className = 'mdi-approval text-success';
      message = 'The room is still free for you. Hurry up! Our smart contract respects only one rule: First come, first served.';
      break;
    }
    case IS_FULL: {
      className = 'mdi-alert-circle text-danger';
      message = 'The room is not available for this date. Try a different room or select a different date, please.';
      break;
    }
    default: {
      className = 'mdi-loading mdi-spin text-primary';
      message = 'loading...';
    }
  }
  return (
    <div className="p-1" style={{ height: 90 }}>
      <i className={classnames('mdi mdi-18px align-middle', className)} />
      <span>
        &nbsp;
        {message}
      </span>
    </div>
  );
};

AvailabilityLabel.propTypes = {
  status: PropTypes.oneOf(['full', 'available', 'loading']).isRequired,
};

export default AvailabilityLabel;
