
import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import BasicMenu from "./BasicMenu";
import { Card } from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { gray } from '@mui/material/colors'; 
export const ItemTask = () => {
    return(
        <ListItem sx={{bgcolor: '#bdbdbd'}}>
        
        <ListItemAvatar>
            <PendingActionsIcon fontSize="large" sx={{color: 'white', fontSize: 50}} />
        </ListItemAvatar>
        <ListItemText primary="10:00 - Lavar Louca" secondary="Geovana" slotProps={{primary: {fontSize: '20px'}, secondary: {color: 'white'}}}/>
        <BasicMenu/>
        
      </ListItem>
    )
}