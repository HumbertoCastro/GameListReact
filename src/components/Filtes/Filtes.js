import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Filtes.css';
import gameContext from '../../context/gameContext';

const Filtes = () => {
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

  const handleInput = ({ target: { value } }) => setGames(unFilterGames.filter(({ title }) => title.toUpperCase().includes(value.toUpperCase())))

  return (
  <div className="Filtes row">
    <select onChange={({ target: { value } }) => {
      if (value === 'all') {
        setGames(unFilterGames);
      } else {
        const newList = unFilterGames.filter(({ genre }) => genre === value);
        setGames(newList);
      }
    } }>
      <option value="all">All</option>
      {
        games.length > 0 ? renderGenres().map((x) => <option value={ x }>{ x }</option>) : null
      }
    </select>
    <input type='text' onChange={ handleInput } placeholder='Search game by name' />
  </div>
)};

Filtes.propTypes = {};

Filtes.defaultProps = {};

export default Filtes;
