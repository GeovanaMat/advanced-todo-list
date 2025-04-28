import React from 'react';
import { LoginForm } from './LoginForm';
import {Meteor} from "meteor/meteor";
import { useTracker} from "meteor/react-meteor-data"
import { Home } from './Home';
import { Button } from '@mui/material';
import ButtonUsage from './ButtonUsage';




export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (<>
  {user ? <div>
    <Home username={user.username}/>
    <ButtonUsage/>
    </div> :<LoginForm/>}
  </>);
}
