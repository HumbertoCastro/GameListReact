import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameCard.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Rating } from 'react-simple-star-rating'
import { heart } from '../../img/heart';
import gameContext from '../../context/gameContext';
import { addRating } from '../../firebase';

const GameCard = ({ dev, thumb, genre, date, desc, title, addfav, fav, stars }) => {  
  const [rating, setRating] = useState(stars);
  const [logged, setLogged] = useState(false);
  const [favGame, setFav] = useState(fav);

  console.log(fav === true ? `${title} Favorito ${favGame}` : '');

  const {
    user,
    setUnFilter,
    unFilterGames,
  } = useContext(gameContext);

  const handleRating = (rate) => {
    const unfilterList = unFilterGames;
    if (unfilterList.some((x) => x.title === title)) {
      unfilterList.map((x) => {
        if (x.title === title) {
          x.stars = rate;
          x.fav = true;
        }
        return x;
      })
    };
    setUnFilter(unfilterList);
    setRating(rate);
    addRating(user, {title, stars: rate})
  }
  const onPointerMove = () => {}

  const auth = getAuth();
  const formatedData = () => {
    let dateStr = date.replace(/-/g, '/');
    let newDate = new Date(dateStr);
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    let formattedDate = newDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  
  useEffect(() => {
    if (user) {
      setLogged(true);
    }
  }, [rating, logged, auth]);
  
  return (
  <div className="GameCard scale-in-center">
  <img src={ thumb } alt='thumb-img' />
    <div className='sub-text column'>
      <div className='column title' style={ { width: '100%' }}>
        <div className='row s-btw top-row'>
          <p>{ formatedData() }</p>
          <Rating
            onClick={handleRating}
            onPointerMove={onPointerMove}
            readonly={!logged}
            size="20"
            transition={true}
            initialValue={stars}
          />
        </div>
        <h1>{ title }</h1>
      <p className='dev'>{ dev }</p>
      </div>
      <p>{ desc }</p>
      <div className='row s-btw botton-row'>
        <p className='genre'>{ genre }</p>
        <button onClick={() => {
          setFav(true);
          addfav({dev, thumb, genre, date, desc, title, stars: rating,});
          } } disabled={!logged} className='fav-btn' style={ favGame || fav ? { color: 'red' }  : null} >{ heart() }</button>
      </div>
    </div>
  </div>
)};

GameCard.propTypes = {};

GameCard.defaultProps = {};

export default GameCard;
