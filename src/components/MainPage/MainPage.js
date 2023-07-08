import React from 'react';
import PropTypes from 'prop-types';
import './MainPage.css';
import Header from '../Header/Header';
import GameList from '../GameList/GameList';

const MainPage = () => (
  <div className="MainPage">
    <Header />
    <GameList />
  </div>
);

MainPage.propTypes = {};

MainPage.defaultProps = {};

export default MainPage;
