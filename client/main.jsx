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

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="tasks" element={<ListTasks />} />
        <Route path="/tasks/:taskId" element={<InfoTask />} />
        <Route path="profile" element={<FormProfile />} />

      </Routes>
    </BrowserRouter>
  );
});
