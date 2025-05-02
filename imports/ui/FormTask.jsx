import React, {useState} from "react";
import {Meteor} from 'meteor/meteor';
import { Add } from "@mui/icons-material";
import {
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Fab,
  Select,
} from "@mui/material";

export const FormTask = () => {

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

  return (
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
            <MenuItem value={"pessoal"}>Pessoal</MenuItem>
            <MenuItem value={"publico"}>Público</MenuItem>
          </Select>
        </FormControl>

        <Fab sx={{}} color="gray" aria-label="add" size="medium" type="submit">
          <Add />
        </Fab>
      </Stack>
    </form>
  );
};
