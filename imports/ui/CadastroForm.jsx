import React from "react";
import { Stack, TextField,Typography,Button} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Meteor } from 'meteor/meteor';
export const CadastroForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        Meteor.call('user.createUser', username, password, (error, result) => {
              if (error) {
                console.error('Erro ao criar usuário:', setErro('Usuário já existe'));
                return;
              }
              navigate('/');
        });
    }

    return(<>
    <div className="form">
        <Typography
          style={{
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          }}
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 5,
            textAlign: "center",
          }}
        >
          Cadastro
        </Typography>
      </div>
    <form className="form" onSubmit={handleSubmit}>
    <Stack
          spacing={2}
          color="blue"
          sx={{ width: "30%", justifyContent: "center" }}
    >

<TextField
                size="medium"
                id="outlined-required"
                label="Username"
                type="text"
                name="username"
                value={username}
                required
                helperText={erro}
                onChange={(e) => setUsername(e.target.value)}
              />
    <TextField
                size="medium"
                id="outlined-required"
                label="Senha"
                type="password"
                name="senha"
                value={password}
                required
                onChange={(e) =>  setPassword(e.target.value)}
              />
    </Stack>
    
    <Stack direction={'row'} spacing={5}>
    <Button type="submit" color="black">Cadastrar</Button>
    <Button color="black" onClick={() => navigate('/')}>Cancelar</Button>
    </Stack>
    
    
    </form>
    </>);
}