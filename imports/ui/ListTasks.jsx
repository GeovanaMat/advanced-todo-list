import * as React from 'react';
import List from '@mui/material/List';
import { ItemTask } from './ItemTask';
import { Card, Container, createTheme, Stack, Typography } from '@mui/material';

  
  

export const ListTasks = () => {
  return (
    <>
    <div className='tasks-container'>   
    <Typography variant='h1' sx={{fontWeight: 'bold', fontSize: 30, marginBottom: 3}}>
    Tarefas Cadastradas
    </Typography>
        
    <List sx={{width:'50%'}}>
    <Stack
    spacing={{ xs: 1, sm: 2 }}
    direction="row"
    useFlexGap
    sx={{ flexWrap: 'wrap' }}
    >
        <ItemTask/>
        <ItemTask/>
        <ItemTask/>
    </Stack>
       

    </List>

    </div>
    
    </>
      
   
  );
};
