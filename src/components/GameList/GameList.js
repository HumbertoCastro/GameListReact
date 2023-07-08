import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameList.css';
import gameContext from '../../context/gameContext';
import GameCard from '../GameCard/GameCard';
import Filtes from '../Filtes/Filtes';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import { addFavGame, getFavGames, getRatins } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
const badStatus = [500, 502, 504, 504, 507, 508, 509];

const GameList = () => {
  console.log('gamelistss')
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(['']);
  const [favs, setFavs] = useState([]);
  const [logged, setLogged] = useState(false);

  const {
    games,
    setGames,
    setUnFilter,
    user,
    setUser,
    unFilterGames,
  } = useContext(gameContext);

  const handleClickFav = async (gameObject) => {
    if (!gameObject.stars) {
      gameObject.stars = 0;
    }
    const res = await addFavGame(user, gameObject);
    if (typeof res === "object") {
      console.log(res);
      setUnFilter(unFilterGames.map((x) => {
        if (x.title === gameObject.title) {
          x.fav = true
        };
        return x;
      }));
    }
  };

  const request = async () => {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(resolve, 5000, {'status': 408});
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
    console.log(res);
    if (res.status === 408) {
      setErrMsg(['O servidor demorou para responder, tente mais tarde', res.status]);
      setError(true);
    }
    else if (badStatus.includes(res.status)) {
      setErrMsg(['O servidor fahou em responder, tente recarregar a página', res.status]);
      setError(true);
    } else if (res.status === 200) {
      console.log('respondeu', timeoutPromise);
      clearTimeout(timeoutPromise);
      const jsonRes = await res.json();
      if (favs) {
        let ratings = null
        if (user) {
          ratings = await getRatins(user);
        }
        if (ratings) {
        const gamesListArray = [...favs, ...jsonRes.filter((x) =>  !favs.some((favoritos) => favoritos.title === x.title))].map((x) => {
          ratings.forEach(y => {
            if (y.title === x.title) {
              x.stars = y.stars;
            }
          });
          return x;
        });
        setGames(gamesListArray);
        setUnFilter(gamesListArray);
        } else {
          const gamesListArray = [...favs, ...jsonRes.filter((x) =>  !favs.some((favoritos) => favoritos.title === x.title))];
          setGames(gamesListArray);
          setUnFilter(gamesListArray);

        }
      }
    } else {
      setErrMsg(['O servidor não conseguirá responder por agora, tente voltar novamente mais tarde', res.status]);
      setError(true);
    }
  }

  const getFavs = async (uid) => {
    const list = await getFavGames(uid);
    if (list) {
      const favsList = list.map(({ dev, thumb, genre, date, desc, title, stars}) => ({
        developer: dev,
        thumbnail: thumb,
        genre,
        release_date: date,
        short_description: desc,
        title,
        fav: true,
        stars: stars,
        addfav: handleClickFav,
      }));
      setFavs(favsList);
      setGames(favsList);
      setUnFilter(favsList);
    } else {
      setFavs([]);
      setGames();
      setUnFilter([]);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if(user) {
          getFavs(user.uid);
          setUser(user.uid);
          setLogged(true);
      } else {
        request();
      }
    })
  }, []);

  useEffect(() => {
    request();
  }, [favs])

  const renderGames = () => (
    <div className='all-games colunm'>
      <Filtes logged={ logged } />
      <div className='games-display'>
        {
          games.length > 0 ? games.map(({ developer, thumbnail, genre, release_date, short_description, title, fav, stars}) => (
            <GameCard
              dev={ developer }
              thumb={ thumbnail }
              genre={ genre }
              date={ release_date }
              desc={ short_description}
              title={ title }
              fav={fav}
              stars={stars}
              addfav={ handleClickFav } />
          )) : favs.length > 0 ? favs.map(({ developer, thumbnail, genre, release_date, short_description, title, fav, stars}) => (
            <GameCard
              dev={ developer }
              thumb={ thumbnail }
              genre={ genre }
              date={ release_date }
              desc={ short_description}
              title={ title }
              fav={fav}
              stars={stars}
              addfav={ handleClickFav } />
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
          <Filtes logged={ logged }/>
          <p>No match</p>
        </div> : renderGames() : <Loading />
      }
    </div>
  )
};

GameList.propTypes = {};

GameList.defaultProps = {};

export default GameList;
