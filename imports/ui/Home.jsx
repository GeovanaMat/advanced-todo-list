import React from "react";
import { InfoTask } from "./InfoTask";

export const Home = ({ username }) => {
  return (
    <div className="main-home">
      <span>Olá {username}, seja bem vindo ao Todo List</span>

      <div className="infotask-container">
        {["concluidas", "pendentes", "cadastradas"].map((status) => {
          return <InfoTask key={status} status={status} />;
        })}

        <div>
          <h1>Visualizar Tarefas</h1>
        </div>
      </div>
    </div>
  );
};
