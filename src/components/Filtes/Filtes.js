import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Filtes.css';
import gameContext from '../../context/gameContext';

const Filtes = ({ logged }) => {
  const [onlyfavs, setOnlyfavs] = useState(false);
  const {
    games,
    setGames,
    unFilterGames,
  } = useContext(gameContext);

  const renderGenres = () => {
    console.log('UNFILTER,', unFilterGames);
    const all = unFilterGames.map(({ genre }) => genre);
    const without_duplicates = [...new Set(all)];
    return without_duplicates;
  }

  const handleInput = ({ target: { value } }) => {
    if (onlyfavs) {
      setGames(unFilterGames.filter(({ title, fav }) => title.toUpperCase().includes(value.toUpperCase()) && fav))
    } else {
      setGames(unFilterGames.filter(({ title }) => title.toUpperCase().includes(value.toUpperCase())))
    }
  }
  const handleCheckbox = ({ target: { checked } }) => {
    if (checked) {
      setGames(unFilterGames.filter(({ fav }) => fav));
      setOnlyfavs(true);
    } else {
      setGames(unFilterGames);
      setOnlyfavs(false);
    }
  }

  const handleRatings = ({ target: { value } }) => {
    let arrayToBeUsed = [];
    if (onlyfavs) {
      arrayToBeUsed = unFilterGames.filter(({fav}) => fav);
    } else {
      arrayToBeUsed = unFilterGames;
    }
    if (value === 'high') {
      const shorted = (arrayToBeUsed.sort((a, b) => {
      if (a.stars && a.stars > b.stars) {
        return -1;
      } else if (a.stars && a.stars < b.stars) {
        return 1;
      } else {
        return 0;
      }
      }));
      setGames([...shorted])
    } else if (value === 'low') { 
      const shorted = (arrayToBeUsed.sort((a, b) => {
        if (a.stars && a.stars > b.stars) {
          return 1;
        } else if (a.stars && a.stars < b.stars) {
          return -1;
        } else {
          return 0;
        }
        }));
        setGames([...shorted]) 
    }
    console.log(arrayToBeUsed)
  }

  return (
  <div className="Filtes row">
    <select onChange={({ target: { value } }) => {
      console.log('handle')
      if (value === 'all') {
        if (onlyfavs) {
          setGames(unFilterGames.filter((x) => x.fav));
        } else {
          setGames(unFilterGames);
        }
      } else {
        if (onlyfavs) {
          const newList = unFilterGames.filter(({ genre, fav }) => genre === value && fav);
          setGames(newList);
        } else {
          const newList = unFilterGames.filter(({ genre }) => genre === value);
          setGames(newList);
        }
      }
    } }>
      <option value="all">All</option>
      {
        renderGenres().map((x) => <option value={ x }>{ x }</option>)
      }
    </select>
    <input type='text' onChange={ handleInput } placeholder='Search game by name' />
    {
      logged ? 
      <div className='row'>
        <label for='check' className='checkbox'> Show only favs</label>
        <input id='check' type='checkbox' onChange={ handleCheckbox } />
      </div> : null
    }
    <select onChange={ handleRatings }>
      <option value='none'>Rate</option>
      <option value='high'>Higher ratings</option>
      <option value='low'>Lower ratings</option>
    </select>
  </div>
)};

Filtes.propTypes = {};

Filtes.defaultProps = {};

export default Filtes;
