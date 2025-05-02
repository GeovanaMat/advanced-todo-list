import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export const FormProfile = () => {
  const navigate = useNavigate();
  const isLoading = useSubscribe("userData");
  const user = useTracker(() => {
    return Meteor.users.findOne({});
  });

  const [formProfile, setFormProfile] = useState({
    name: "",
    birthDate: "",
    companyName: "",
    sex: "",
    avatarPhoto: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProfile((prevFormProfile) => {
      return { ...prevFormProfile, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.callAsync("user.updateProfile", formProfile);
    navigate("/home");
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      Meteor.callAsync('photos.insert',base64).then(() => {
        setFormProfile((prev) => {return {...prev, avatarPhoto: base64}})
      })
        
          
    }
      

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  useEffect(() => {
    if (user) {
      setFormProfile({
        name: user.profile.name || "",
        birthDate: user.profile.birthDate || "",
        companyName: user.profile.companyName || "",
        sex: user.profile.sex || "",
        avatarPhoto: user.profile.avatarPhoto || "",
        email: user.profile.email || "",
      });
    }
  }, [isLoading()]);

  if (isLoading()) {
    return <span>Carregando</span>;
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
          Perfil
        </Typography>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <Avatar>
        <img id="preview" width={100} src={formProfile.avatarPhoto} />
        </Avatar>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Escolher Foto
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleChangePhoto(event)}
            multiple
          />
        </Button>

        <Stack
          spacing={2}
          color="blue"
          sx={{ width: "50%", justifyContent: "center" }}
        >
          <TextField
            size="medium"
            id="outlined-required"
            label="Nome"
            type="text"
            name="name"
            value={formProfile.name}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            size="medium"
            id="outlined-required"
            label="E-mail"
            type="text"
            name="email"
            value={formProfile.email}
            onChange={(e) => handleChange(e)}
          />
          <FormControl fullWidth>
            <TextField
              size="medium"
              id="outlined-required"
              type="date"
              label="Data de aniversário"
              name="birthDate"
              value={formProfile.birthDate}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formProfile.sex}
              name="sex"
              label="Sexo"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={"F"}>Feminino</MenuItem>
              <MenuItem value={"M"}>Masculino</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            size="medium"
            id="outlined-required"
            label="Nome da Empresa"
            type="text"
            name="companyName"
            value={formProfile.companyName}
            onChange={(e) => handleChange(e)}
          />
        </Stack>

        <Stack spacing={2} margin={3} direction="row">
          <Button
            variant="contained"
            color="gray"
            onClick={() => navigate("/home")}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="gray" type="submit">
            Salvar
          </Button>
        </Stack>
      </form>
    </>
  );
};
