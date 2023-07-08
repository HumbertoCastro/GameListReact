import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import { useAuthState } from "react-firebase-hooks/auth";

import {
  auth,
  registerWithEmailAndPassword,
} from "../../firebase.js";
import { useNavigate } from 'react-router-dom';

const Register = ({set}) => {

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [user, loading, error] = useAuthState(auth);

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
        await registerWithEmailAndPassword(email, senha);
        history('/GameListReact/auth/')
      } catch (e) {
        setMensagem(e.message);
      }
    }
  };


  return (
    <form class="form">
    <p id="heading">Register</p>
    <div class="field">
      <input autocomplete="on" placeholder="Email" class="input-field" type="email" onChange={({ target: { value } }) => setEmail(value)} />
    </div>
    <div class="field">
      <input placeholder="Password" class="input-field" type="password"  onChange={({ target: { value } }) => setSenha(value)} />
    </div>
    <div class="btn">
      <button className='login' onClick={verificarEmailSenha}>
        Create Account
      </button>
      <button className='login' onClick={() => history('/GameListReact/auth/')}>
        Back to login
      </button>
    </div>
    <p>{mensagem}</p>
</form>
  )
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
