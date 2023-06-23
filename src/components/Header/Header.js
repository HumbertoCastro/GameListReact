import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import controler from '../../img/controller.svg'

const Header = () => (
  <header className="Header row">
    <h1>
      GAMELIST
    </h1>
    <img src={controler} />
  </header>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
