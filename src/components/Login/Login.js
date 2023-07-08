import React, { useContext, useState } from 'react';
import { logInWithEmailAndPassword } from "../../firebase";
import { useNavigate } from 'react-router-dom';

import './Login.css';
import gameContext from '../../context/gameContext';

const Login = ({set, setLogged}) => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const {
    setUser,
  } = useContext(gameContext);

  const verificarEmailSenha = async (event) => {
    event.preventDefault();
    if (email.length < 8) {
      setMensagem("O email deve ter no mínimo 8 caracteres.");
    } else if (senha.length < 6) {
      setMensagem("A senha deve ter no mínimo 6 caracteres.");
    } else if (!/[A-Z]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos uma letra maiúscula.");
    } else {
      try {
        const res = await logInWithEmailAndPassword(email, senha);
        setUser(res);
        history('/GameListReact/');
      } catch (e) {
        setMensagem('Email or Password my be wrong');
        console.log(e)
      }
    }
    console.log(email, senha);
  };


  return (
    <form class="form">
    <p id="heading">Login</p>
    <div class="field">
      <input placeholder="Email" class="input-field" type="email" onChange={({ target: { value } }) => setEmail(value)} />
    </div>
    <div class="field">
      <input placeholder="Password" class="input-field" type="password"  onChange={({ target: { value } }) => setSenha(value)} />
    </div>
    <div class="btn">
      <button class="login" onClick={verificarEmailSenha}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
      <button class="sign-in" onClick={(event) => {
        event.preventDefault();
        history('register');
      }}>Register</button>
    </div>
    <p>{mensagem}</p>
</form>
  )
};

export default Login;
