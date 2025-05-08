import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListTasks } from "../imports/ui/ListTasks";
import {InfoTask} from '../imports/ui/InfoTask';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { FormProfile } from "../imports/ui/FormProfile";
import { Home } from "../imports/ui/Home";
import { CadastroForm } from "../imports/ui/CadastroForm";
import { LoginForm } from "../imports/ui/LoginForm";
import { RequireAuth } from "../imports/routes/RequireAuth";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/cadastro" element={<CadastroForm/>} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="tasks" element={<RequireAuth><ListTasks /></RequireAuth>} />
        <Route path="/tasks/:taskId" element={<RequireAuth><InfoTask /></RequireAuth>} />
        <Route path="profile" element={<RequireAuth><FormProfile/></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
});
