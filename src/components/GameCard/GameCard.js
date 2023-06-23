import React from 'react';
import PropTypes from 'prop-types';
import './GameCard.css';

const GameCard = ({ dev, thumb, genre, date, desc, title }) => {
  const formatedData = () => {
    let dateStr = date.replace(/-/g, '/');
    let newDate = new Date(dateStr);
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    let formattedDate = newDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  return (
  <div className="GameCard">
  <img src={ thumb } alt='thumb-img' />
    <div className='sub-text column'>
      <div className='column title'>
        <p>{ formatedData() }</p>
        <h1>{ title }</h1>
      <p className='dev'>{ dev }</p>
      </div>
      <p>{ desc }</p>
      <p className='genre'>{ genre }</p>
    </div>
  </div>
)};

GameCard.propTypes = {};

GameCard.defaultProps = {};

export default GameCard;
