import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => {
  const { block, label } = props;
  if (!block) {
    return (
      <span>
        <i className="mdi mdi-loading mdi-36px mdi-spin text-primary" />
        {label}
      </span>
    );
  }
  return (
    <div className="loader" style={{ height: block }}>
      <div>
        <i className="mdi mdi-loading mdi-36px mdi-spin text-primary" />
        {label && (
          <p>
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

Loader.defaultProps = {
  label: '',
  block: 0,
};

Loader.propTypes = {
  label: PropTypes.string,
  block: PropTypes.number,
};

export default Loader;
