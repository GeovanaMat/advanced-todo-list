import React from "react";
import { CountTask } from "./CountTask";
import { InfoTask } from "./InfoTask";
import { Meteor } from "meteor/meteor";
import {
  Drawer,

  Box,
  Grid,
  CardContent,
  Typography,

  Button,
  Card,
} from "@mui/material";
import { CastRounded } from "@mui/icons-material";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { useNavigate } from "react-router-dom";
import { DrawerHome } from "./DrawerHome";

export const Home = () => {
  
  const navigate = useNavigate();
  const isLoading = useSubscribe('tasks');
  
  const currentUser = useTracker(() => Meteor.user());

  const tasksCadastradasCount = useTracker(() =>
    TasksCollection.find({}).count()
  );

  const tasksConcluidasCount = useTracker(() => {
    return TasksCollection.find({ situacao: "concluida" }).count();
  });
  const tasksPendentesCount = useTracker(() => {
    return TasksCollection.find({ situacao: "pendente" }).count();
  });

  
  drawerWidth = "15%";
  cartWidth = "large";

  if(!currentUser){
    return <span>Carregando</span>
  }

  return (
    <Box display={"flex"}>
      <DrawerHome photo={currentUser?.profile?.avatarPhoto}  username={currentUser?.username} email={currentUser.profile?.email}/>
      <Box
        display={"flex"}
        width={"100%"}
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
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
          Olá, {currentUser.username}! Bem vindo ao Todo List.
        </Typography>

        <Grid
          container
          sx={{ marginInline: 10 }}
          justifyContent={"center"}
          spacing={{ xs: 2, md: 2 }}
          marginTop={10}
        >
          <Grid key={1} size={{ xs: 4, md: 5 }}>
            <Card>
              <>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total de Tarefas Cadastradas
                  </Typography>
                  <Typography variant="h6">{tasksCadastradasCount}</Typography>
                </CardContent>
              </>
            </Card>
          </Grid>
          <Grid key={2} size={{ xs: 4, md: 5 }}>
            <Card>
              <>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total de Tarefas Concluídas
                  </Typography>
                  <Typography variant="h6">{tasksConcluidasCount}</Typography>
                </CardContent>
              </>
            </Card>
          </Grid>
          <Grid key={3} size={{ xs: 4, md: 5 }}>
            <Card>
              <>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total de Tarefas Pendentes
                  </Typography>
                  <Typography variant="h6">{tasksPendentesCount}</Typography>
                </CardContent>
              </>
            </Card>
          </Grid>

          <Grid
            key={4}
            size={{ xs: 4, md: 5 }}
            onClick={() => navigate("/tasks")}
          >
            <Button
              variant="outlined"
              color="black"
              fullWidth
              sx={{ height: "100%" }}
            >
              Visualizar Tarefas
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
