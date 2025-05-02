import React from "react";
import {Meteor} from 'meteor/meteor'
import { Drawer,List,ListItem, ListItemAvatar,Avatar,ListItemText,Button} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
export const DrawerHome = ({username,email}) => {
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
        <ListItem onClick={() => navigate('/profile')}>
        <ListItemAvatar>
          <Avatar>
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
         primary={username ? username : ''} secondary={email ? email : ''} slotProps={{secondary: {overflow: 'hidden',textOverflow: 'ellipsis'}}} />
      </ListItem>
      
      
      <ListItem onClick={() => navigate('/tasks')}>
        <ListItemAvatar>
          <Avatar>
            <AddTaskIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tarefas" />
      </ListItem>
     
      </List>

      <Button onClick={logout} variant="text" sx={{position: 'fixed', bottom: 10, left: 10}} color="black"  startIcon={<LogoutIcon />}>
        Sair
        </Button>
        
    </Drawer>
    </>)
}