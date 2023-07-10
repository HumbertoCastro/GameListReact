import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Filtes.css';
import gameContext from '../../context/gameContext';
import Select from 'react-select';

const Filtes = ({ logged }) => {
  const [onlyfavs, setOnlyfavs] = useState(false);
  const {
    games,
    setGames,
    unFilterGames,
  } = useContext(gameContext);

  const renderGenres = () => {
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
    console.log(unFilterGames.filter(({ fav }) => fav));
    if (checked) {
      setGames(unFilterGames.filter(({ fav }) => fav));
      setOnlyfavs(true);
    } else {
      setGames(unFilterGames);
      setOnlyfavs(false);
    }
  }

  const handleRatings = ({value}) => {
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
    <Select onChange={({ value }) => {
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
    } } options={ [{value: 'all', label: 'All'}, ...renderGenres().map((x) => ({value: x, label: x}))] }>
    <option value="all">All</option>
    {
      renderGenres().map((x) => <option value={ x }>{ x }</option>)
    }</Select>
    <input type='text' className='text-input' onChange={ handleInput } placeholder='Search game by name' />
    {
      logged ? 
      <div className='row'>
        <label for='check' className='checkbox' style={{ color: 'white' }}> Show only favs</label>
        <input id='check' type='checkbox' onChange={ handleCheckbox } />
      </div> : null
    }
    <Select onChange={ handleRatings } options={ [{
      value: 'none',
      label: 'Select Rating',
    }, {
      value: 'high',
      label: 'Highest Ratings',
    }, {
      value: 'low',
      label: 'Lowest Ratings',
    }] } styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        color: 'red',
      }),
    }}></Select>
  </div>
)};

Filtes.propTypes = {};

Filtes.defaultProps = {};

export default Filtes;
