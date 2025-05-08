import React, { useState }  from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ClearIcon from '@mui/icons-material/Clear';

export const BarraPesquisa = ({handleBusca}) => {
    const [valor,setValor] = useState("");

    const handleInputChange = (e) => {
        setValor(e.target.value);
    }

    return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '75%' }}
      onSubmit={(e) => {
        e.preventDefault(); // impede o recarregamento
        handleBusca(valor); // dispara a busca também no Enter
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Procurar Tarefa"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={valor}
        onChange={handleInputChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {handleBusca(valor); console.log(valor)}}>
        <SearchIcon />
      </IconButton>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => handleBusca("")}>
        < ClearIcon  />
      </IconButton>
    </Paper>
  );
}