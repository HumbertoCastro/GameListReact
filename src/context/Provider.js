import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gameContext from './gameContext';

function Provider({ children }) {
  const [games, setGames] = useState();
  const [unFilterGames, setUnFilter] = useState();
  const [user, setUser] = useState();

  const contextValue = {
    games,
    setGames,
    unFilterGames,
    setUnFilter,
    user,
    setUser,
  };

  return (
    <gameContext.Provider value={ contextValue }>
      {children}
    </gameContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
