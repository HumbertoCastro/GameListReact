import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameList.css';
import gameContext from '../../context/gameContext';
import GameCard from '../GameCard/GameCard';
import Filtes from '../Filtes/Filtes';
import Error from '../Error/Error';
const badStatus = [500, 502, 504, 504, 507, 508, 509];

const GameList = () => {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {
    games,
    setGames,
    setUnFilter,
  } = useContext(gameContext);

  const request = async () => {

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(resolve, 5000, {'status': 999});
    });

    const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
    const res = await Promise.race([
      fetch(url, {
        headers: {
          "dev-email-address": "humberto-dev@hotmail.com"
        }
      }),
      timeoutPromise
    ]);
    if (res.status === 999) {
      setErrMsg('O servidor demorou para responder, tente mais tarde');
      setError(true);
    }
    else if (badStatus.includes(res.status)) {
      setErrMsg('O servidor fahou em responder, tente recarregar a página');
      setError(true);
    } else if (res.status === 200) {
      const jsonRes = await res.json();
      setGames(jsonRes);
      setUnFilter(jsonRes);
    } else {
      setErrMsg('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
      setError(true);
    }
  }

  useEffect(() => {
    request();
  }, [])

  const renderGames = () => (
    <div className='all-games colunm'>
      <Filtes />
      <div className='games-display'>
        {
          games.length > 0 ? games.map(({ developer, thumbnail, genre, release_date, short_description, title}) => (
            <GameCard dev={ developer } thumb={ thumbnail } genre={ genre } date={ release_date } desc={ short_description} title={ title } />
          )) : null
        }
      </div>
    </div>
  )

  if (error) {
    return (<Error msg={ errMsg } />);
  }

  return (
    <div className='GameList'>
      {
        games ? games.length <= 0 ? <div>
          <Filtes />
          <p>No match</p>
        </div> : renderGames() : <p>Loading</p>
      }
    </div>
  )
};

GameList.propTypes = {};

GameList.defaultProps = {};

export default GameList;
