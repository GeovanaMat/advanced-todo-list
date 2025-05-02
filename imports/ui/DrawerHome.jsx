import React from "react";
import {Meteor} from 'meteor/meteor'
import { Drawer,List,ListItem, ListItemAvatar,Avatar,ListItemText,Button, ListItemButton} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
export const DrawerHome = ({username,email,photo}) => {
    const navigate = useNavigate()
    const logout = () => {
        
        Meteor.logout();
        navigate('/');};
    const drawerWidth = '15%'
    return(<>
     <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    
    <ListItem onClick={() => navigate('/profile')} disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <img type="preview" src={photo} width={100}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
         primary={username ? username : ''} secondary={email ? email : ''} slotProps={{secondary: {overflow: 'hidden',textOverflow: 'ellipsis'}}} />
      </ListItemButton>
      </ListItem>
    
        
      
      
      <ListItem onClick={() => navigate('/tasks')}  disablePadding>
        <ListItemButton>

        <ListItemAvatar>
          <Avatar>
            <AddTaskIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tarefas" />
        </ListItemButton>
      </ListItem>
     
     
      </List>

      <Button onClick={logout} variant="text" sx={{position: 'fixed', bottom: 10, left: 10}} color="black"  startIcon={<LogoutIcon />}>
        Sair
        </Button>
        
    </Drawer>
    </>)
}