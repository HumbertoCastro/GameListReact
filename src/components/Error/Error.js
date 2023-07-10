import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';
import errorsvg from '../../img/emoji-frown.svg'

const Error = ({msg}) => (
  <div className='Error column'>
    <img src={ errorsvg } alt='error-sad-face' />
    <h1 className="column">
      {
        msg[1]
      }
    </h1>
    <p>{ msg[0] }</p>
    <button onClick={() => window.location.reload(true)}>Refresh Page</button>
  </div>
);

Error.propTypes = {};

Error.defaultProps = {};

export default Error;
