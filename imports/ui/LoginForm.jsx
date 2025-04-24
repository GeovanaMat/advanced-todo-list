import React, { useState } from "react";
import {Meteor} from "meteor/meteor"

export const LoginForm  = () => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleSubumit = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username,password);

    };

    return(
        <>
        <form onSubmit={handleSubumit}>
            <h1>Bem vindo ao ToDo List</h1>
            <input 
            type="text"
            placeholder="Usuário"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required/>

            <input
            type="text"
            placeholder="Senha"
            name="senha"
            onChange={(e) => setPassword(e.target.value)}
            required/>

            <button 
            type="submit">
                Entrar
            </button>

        </form>
        
        <span>Cadastrar</span>
        <span>Recuperar Senha</span>
        </>
    );
}