import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import {Button, Stack, TextField} from '@mui/material'
import { useNavigate, Link } from "react-router-dom";
export const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubumit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
    navigate('/home');
  };

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubumit(e)}>
        <h1>Bem vindo ao ToDo List</h1>

        <Stack 
        spacing={3}
        width={'30%'}
        >
        <TextField
          required
          id="outlined-required"
          label="Usuário"
          type="text"
          name="usuario"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          id="outlined-required"
          label="Senha"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="gray">Entrar</Button>
        </Stack> 
        <Link to={'/cadastro'}><h5>Cadastrar-se</h5></Link>
      </form>
    </>
  );
};
