import { FormControl,TextField,InputLabel,Select,MenuItem,Typography,Stack, Button, Avatar } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useTracker, useSubscribe} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const FormProfile = () => {
    const isLoading = useSubscribe('userData');
    const user = useTracker(() => Meteor.users.findOne());
    const navigate = useNavigate();
    const [formProfile, setFormProfile] = useState({name: '', birthDate: '', sex: '',companyName:'',avatarPhoto:'', emails: []});
    
    
    useEffect(() => {
        if(user){
            setFormProfile({
                name: 'geovana'
            });
        }
        
      }, []);
    
          

    if (isLoading()) {
        return <>Carregando...</>;
      }
 
    


     
    
   
    

    
    
    const handleChange = (e) => {
       
      };
    
    return(
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
                      Perfil
                    </Typography>
        </div>
        
        <form className='form'>
        <Avatar/>
       
        <Stack
          spacing={2}
          color="blue"
          sx={{ width: "50%", justifyContent: "center"
           }}
        >
             <TextField
                    required
                    size='medium'
                    id="outlined-required"
                    label="Nome"
                    type="text"
                    // disabled={viewMode}
                    name="profile"
                    //value={formProfile.name}
                    
                    onChange={(e) => handleChange(e)}
                  />

<TextField
                    required
                    size='medium'
                    id="outlined-required"
                    label="E-mail"
                    type="text"
                    // disabled={viewMode}
                    name="email"
                    //value={email ? email : ''}
                    
                    // onChange={(e) => handleChange(e)}
                  />    
<FormControl fullWidth>

<TextField
                    required
                    size='medium'
                    id="outlined-required"
                    type="date"
                    label='Data de aniversário'
                    // disabled={viewMode}
                    name="dataAniversario"
                    //value={birthDate}
                    slotProps={{ inputLabel: { shrink: true } }}
                   
                    // onChange={(e) => handleChange(e)}
                  />   
</FormControl>

        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"

    label="Sexo"

  >
    <MenuItem value={"F"}>Feminino</MenuItem>
    <MenuItem value={"M"}>Masculino</MenuItem>
  </Select>
</FormControl>
<TextField
                    required
                    size='medium'
                    id="outlined-required"
                    label="Nome da Empresa"
                    type="text"
                    // disabled={viewMode}
                    name="empresa"
                    //value={companyName}
                    // value={formData.nome ? formData.nome : ""}
                    // onChange={(e) => handleChange(e)}
                  />   
  
        </Stack>

        <Stack spacing={2} margin={3} direction="row">
           <Button
           variant="contained"
           color="gray"
           onClick={() => navigate('/')}
           >
            Cancelar
           </Button>
           <Button
           variant="contained"
           color="gray">
            Salvar
           </Button>
        </Stack>
        

        </form>
        
        
        </>

       
        
    );
}