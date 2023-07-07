import { useState } from 'react';
import './App.css';
import GameList from './components/GameList/GameList';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  const [logged, setLogged] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <div className="App">
      <Header />
      {
        logged ? <GameList /> : register ? <Register set={setRegister} /> : <Login set={setRegister} setLogged={ setLogged } />
        // <GameList />
      }
    </div>
  );
}

export default App;
