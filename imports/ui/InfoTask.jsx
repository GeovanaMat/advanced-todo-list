import {
  Typography,
  Stack,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select, 
  MenuItem
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { useNavigate } from "react-router-dom";
export const InfoTask = () => {
  const { taskId } = useParams();
  const isLoading = useSubscribe("tasks");
  const [viewMode, setViewMode] = useState(true);
  const navigate = useNavigate();
  const task = useTracker(() =>
    TasksCollection.find({ _id: taskId }).fetch()
  )[0];


  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    situacao: "",
    descricao: "",
    usuario: "",
    tipo: "publico",
  });

  

  

  const handleChange = (e, nameInfo = null) => {
    const { name, value } = e.target;
    const fieldName = nameInfo || name;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (task) {
    setFormData({
        _id: task._id || "",
        nome: task.nome || "",
        data: task.data || "",
        situacao: task.situacao || "",
        descricao: task.descricao || "",
        usuario: task.usuario || "",
        tipo: task.tipo || "",
      });
    
    }
  }, [taskId]);




  const handleChangeSituacao = (e, newSituacao) => {
    if(formData.situacao == 'cadastrada' && newSituacao == 'concluida'){
        return
    }

    if (newSituacao !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        situacao: newSituacao,
      }));
    }
  };

  const handleChangeTipo = (e) => {
    handleChange(e, "tipo");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.callAsync("tasks.updateTask", formData);
    navigate("/tasks");
    setViewMode(true);
  };

  if (isLoading()) {
    
    return <Typography>Carregando...</Typography>;
  }

  console.log(formData);

  if (!task) {
    return <Typography>Tarefa não encontrada.</Typography>;
  }


  return (
    <>
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
          Editar Tarefa: {task.nome}
        </Typography>
      </div>
      <form className="form">
        <Stack
          spacing={2}
          color="blue"
          sx={{ width: "50%", justifyContent: "center" }}
        >
          <TextField
            required
            id="outlined-required"
            label="Nome da Tarefa"
            type="text"
            disabled={viewMode}
            name="nome"
            value={formData.nome ? formData.nome : ""}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            id="outlined-required"
            label="Descrição da Tarefa"
            type="text"
            name="descricao"
            disabled={viewMode}
            value={formData.descricao || ""}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            required
            id="outlined-required"
            label="Data"
            type="text"
            name="data"
            disabled={viewMode}
            value={formData.data || ""}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            required
            id="outlined-required"
            label="Usuário"
            type="text"
            name="usuario"
            disabled={viewMode}
            value={formData.usuario || ""}
            onChange={(e) => handleChange(e)}
          />

          <FormControl>
            <InputLabel>Visibilidade</InputLabel>
            <Select
              value={formData.tipo ? formData.tipo : "" }
              label="Visibilidade"
              onChange={handleChangeTipo}
              disabled={viewMode}
            >
              <MenuItem value={"pessoal"}>Pessoal</MenuItem>
              <MenuItem value={"publico"}>Público</MenuItem>
            </Select>
          </FormControl>

           <ToggleButtonGroup
            value={formData.situacao}
            exclusive
            onChange={handleChangeSituacao}
            disabled={viewMode}
          >
            <ToggleButton value="cadastrada">Cadastrada</ToggleButton>
            <ToggleButton value="pendente">Pendente</ToggleButton>
            <ToggleButton value="concluida">Concluída</ToggleButton>
          </ToggleButtonGroup> 
        </Stack>

        <Stack spacing={2} margin={3} direction="row">
          <Button
            variant="contained"
            color="gray"
            onClick={() => navigate("/tasks")}
          >
            Cancelar
          </Button>
          {viewMode ? (
            <Button
              variant="contained"
              color="gray"
              onClick={() => setViewMode(false)}
            >
              Editar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="gray"
              onClick={(e) => handleSubmit(e, formData)}
            >
              Salvar
            </Button>
          )}
        </Stack>
      </form>
    </>
  );
};
