import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameList from './components/GameList/GameList';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MainPage from './components/MainPage/MainPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="GameListReact/" element={<MainPage />} />
        <Route path="GameListReact/auth/" element={<Login />} />
        <Route path="GameListReact/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
