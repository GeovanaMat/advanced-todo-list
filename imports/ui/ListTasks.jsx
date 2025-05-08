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
  IconButton,
  FormControlLabel,
  Checkbox
  
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { useNavigate } from "react-router-dom";
import { FormTask } from "./FormTask";
import { ReactiveVar } from "meteor/reactive-var";
import { BarraPesquisa } from "./BarraPesquisa";

const completas = new ReactiveVar(false);

export const ListTasks = () => {
  const user = useTracker(() => Meteor.user());

  const mostrarCompletas = useTracker(() => completas.get());
  const [pesquisa, setPesquisa] = React.useState("");
  const [pagina, setPagina] = React.useState(1);
  const limite = 4;
  const isLoading = useSubscribe("tasks", mostrarCompletas, pesquisa,pagina, limite);

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

  const handleBusca = (pesquisa) => {
    setPesquisa(pesquisa);
    setPagina(1);
    console.log("Pesquisa:");
    console.log(pesquisa)
  }
 
  

  return (
    <>
      <IconButton  onClick={() => navigate("/home")}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
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
          <Stack direction={'row'} spacing={2}>
          <BarraPesquisa handleBusca={handleBusca}/>
          <FormControlLabel
            control={
              <Checkbox
                checked={completas.get()}
                onChange={(e) => completas.set(e.target.checked)}
              />
            }
            label="Exibir tarefas concluídas"
          />

          </Stack>
          
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
          <Stack direction={'row'}>
            <IconButton onClick={() => setPagina((p) => Math.max(p - 1, 1))} disabled={pagina===1}>
                <NavigateBeforeIcon/>
            </IconButton>
            <h6>Página {pagina}</h6>
            <IconButton onClick={() => setPagina((p) => Math.max(p + 1, 1))} disabled={tasks.length < limite}>
                <NavigateNextIcon/>
            </IconButton>
          </Stack>
          <FormTask user={user} />
          
        </div>
      )}
    </>
  );
};
