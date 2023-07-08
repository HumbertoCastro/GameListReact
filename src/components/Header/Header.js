import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import controler from '../../img/controller.svg'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../firebase';

const Header = () => {
  const [logged, setLogged] = useState(false);
  const auth = getAuth();
  const history = useNavigate();

  const singOut = () => {
    logout();
    setLogged(false);
    history('auth/')
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
        logged ? <button onClick={ singOut } className='signout-btn'>SingOut</button> : <Link to='auth/' className='login-btn'>Login</Link>
      }
    </div>
  </header>
)};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
