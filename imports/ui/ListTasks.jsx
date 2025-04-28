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
  FormControl
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { useNavigate } from "react-router-dom";

export const ListTasks = () => {
  const user = useTracker(() => Meteor.user());
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  const navigate = useNavigate();

  const [nomeTarefa, setNomeTarefa] = React.useState("");
  const [horaTarefa, setHoraTarefa] = React.useState("00:00");
  const [tipoTarefa, setTipoTarefa] = React.useState("pessoal");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomeTarefa) return;

    await Meteor.callAsync("tasks.insert", {
      nome: nomeTarefa.trim(),
      data: horaTarefa,
      usuario: user.username,
      usuarioId: user._id,
      descricao: null,
      tipo: tipoTarefa,
      situacao: "cadastrada",
    });

    setNomeTarefa("");
    setHoraTarefa("00:00");
  };

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

          <form className="form" onSubmit={handleSubmit}>
            <Stack
              direction="row"
              spacing={2}
              color="blue"
              sx={{ width: "50%", justifyContent: "center" }}
            >
              
              <TextField
                required
                id="outlined-required"
                label="Nome da Tarefa"
                type="text"
                value={nomeTarefa}
               
                onChange={(e) => setNomeTarefa(e.target.value)}
              />

              <TextField
                required
                id="outlined-required"
                label="Hora da Tarefa"
                type="time"
                
                onChange={(e) => setHoraTarefa(e.target.value)}
                value={horaTarefa}
              />
                
                <FormControl>
                <InputLabel>Visibilidade</InputLabel>
                <Select
                  value={tipoTarefa}
                  label="Visibilidade"
                  onChange={(e) => setTipoTarefa(e.target.value)}
                >
                  <MenuItem value={'pessoal'}>Pessoal</MenuItem>
                  <MenuItem value={'publico'}>Público</MenuItem>
                </Select>
                </FormControl>
             
              <Fab
                sx={{}}
                color="gray"
                aria-label="add"
                size="medium"
                type="submit"
              >
                <Add />
              </Fab>
            </Stack>
          </form>
        </div>
      )}
    </>
  );
};
