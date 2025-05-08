import React from 'react';
import { LoginForm } from './LoginForm';
import {Meteor} from "meteor/meteor";
import { useSubscribe, useTracker} from "meteor/react-meteor-data"
import { Home } from './Home';
import { Button } from '@mui/material';
import ButtonUsage from './ButtonUsage';
import { MeetingRoom } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';




export const App = () => {
  const user = useTracker(() => Meteor.user());
  return (<LoginForm/>)


}
