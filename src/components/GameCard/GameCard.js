import React from 'react';
import PropTypes from 'prop-types';
import './GameCard.css';

const GameCard = ({ dev, thumb, genre, date, desc, title, addfav }) => {
  const formatedData = () => {
    let dateStr = date.replace(/-/g, '/');
    let newDate = new Date(dateStr);
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    let formattedDate = newDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  return (
  <div className="GameCard scale-in-center">
  <img src={ thumb } alt='thumb-img' />
    <div className='sub-text column'>
      <div className='column title'>
        <div className='row s-btw botton-row'>
          <p>{ formatedData() }</p>
          <button onClick={() => {
            addfav(title)
          } }>FAV</button>
        </div>
        <h1>{ title }</h1>
      <p className='dev'>{ dev }</p>
      </div>
      <p>{ desc }</p>
      <div className='row s-btw botton-row'>
        <p className='genre'>{ genre }</p>
        <p>estrelas</p>
      </div>
    </div>
  </div>
)};

GameCard.propTypes = {};

GameCard.defaultProps = {};

export default GameCard;
