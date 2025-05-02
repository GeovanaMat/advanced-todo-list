import * as React from "react";
import { Meteor } from "meteor/meteor";
import List from "@mui/material/List";
import { ItemTask } from "./ItemTask";
import {
  Stack,
  Typography,
  Fab,
  TextField,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { useNavigate } from "react-router-dom";
import { FormTask } from "./FormTask";

export const ListTasks = () => {
  const user = useTracker(() => Meteor.user());
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  const navigate = useNavigate();



  const onRemoveClick = ({ _id, usuario }) => {
    if (usuario != user.username) {
      return;
    }
    Meteor.callAsync("tasks.delete", { _id });
  };

  const handleEdit = ({ _id, usuario }) => {
    if (usuario != user.username) {
      return;
    }
    navigate(`/tasks/${_id}`);
  };

  return (
    <>
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
        Tarefas Cadastradas
      </Typography>

      {isLoading() ? (
        <div className="tasks-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="tasks-container">
          <List sx={{ width: "50%" }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {tasks.map((task) => {
                return (
                  <ItemTask
                    key={task._id}
                    id={task._id}
                    usuario={task.usuario}
                    dataTarefa={task.data}
                    textoTarefa={task.nome}
                    task={task}
                    onRemoveClick={onRemoveClick}
                    onEditClick={handleEdit}
                  />
                );
              })}
            </Stack>
          </List>
          <FormTask
          />
        </div>
      )}
    </>
  );
};
