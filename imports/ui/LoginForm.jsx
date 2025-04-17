import React, { useState } from "react";


export const LoginForm  = () => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleSubumit = (e) => {
        e.preventDefault();

        

    }
    return(
        <form onSubmit={handleSubumit}>
            <h1>Bem vindo ao ToDo List</h1>
            <input 
            type="text"
            placeholder="usuário"
            onChange={(e) => setUsername(e.target.value)}
            required/>

            <input
            type="text"
            placeholder="senha"
            onChange={(e) => setUsername(e.target.value)}
            required/>

            <button 
            type="submit">
                Entrar
            </button>

        </form>
    );
}