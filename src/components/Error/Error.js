import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

const Error = ({msg}) => (
  <h1 className="Error">
    {
      msg
    }
  </h1>
);

Error.propTypes = {};

Error.defaultProps = {};

export default Error;
