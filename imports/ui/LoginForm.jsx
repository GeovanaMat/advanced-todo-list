import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import {Button, Stack, TextField} from '@mui/material'
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubumit = (e) => {
    e.preventDefault();
    Meteor.call('user.createUser', username, password, (error, result) => {
      if (error) {
        console.error('Erro ao criar usuário:', error);
        return;
      }
  
      
      Meteor.loginWithPassword(username, password, (loginError) => {
        if (loginError) {
          console.error('Erro ao fazer login:', loginError);
        } else {
          navigate('/home');
        }
      });
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubumit}>
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
      </form>

      {/* <span>Cadastrar</span>
      <span>Recuperar Senha</span> */}
    </>
  );
};
