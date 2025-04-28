import React from "react";
import { CountTask } from "./CountTask";
import { InfoTask } from "./InfoTask";
import {Meteor} from 'meteor/meteor'
export const Home = ({ username }) => {
  const user = Meteor.user();
  const logout = () => Meteor.logout();

  return (
    <div className="main-home">
      <span>Olá {username}, seja bem vindo ao Todo List</span>

      <div className="user" onClick={logout}>
        {user.username} 🚪
      </div>

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
