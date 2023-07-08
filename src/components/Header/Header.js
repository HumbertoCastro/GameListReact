import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import controler from '../../img/controller.svg'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { logout } from '../../firebase';

const Header = () => {
  const [logged, setLogged] = useState(false);
  const auth = getAuth();

  const singOut = () => {
    logout();
    setLogged(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setLogged(true);
      }
    })
  }, []);

  return (
  <header className="Header row s-btw">
    <div className='row'>
      <h1>
        GAMELIST
      </h1>
      <img src={controler} alt='controler icon'/>
    </div>
    <div className='row'>
      {
        logged ? <button onClick={ singOut }>SingOut</button> : <Link to='auth/'>Login</Link>
      }
    </div>
  </header>
)};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
