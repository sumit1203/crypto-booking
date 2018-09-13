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
      message = 'We are available';
      break;
    }
    case IS_FULL: {
      className = 'mdi-alert-circle text-danger';
      message = 'This option is not available';
      break;
    }
    default: {
      className = 'mdi-loading mdi-spin text-primary';
      message = 'loading...';
    }
  }
  return (
    <div>
      <i className={classnames('mdi mdi-18px align-middle', className)} />
      <span>
        &nbsp;{message}
      </span>
    </div>
  );
};

AvailabilityLabel.propTypes = {
  status: PropTypes.oneOf(['full', 'available', 'loading']).isRequired,
};

export default AvailabilityLabel;
