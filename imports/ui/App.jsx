import React from 'react';
import { LoginForm } from './LoginForm';
import {Meteor} from "meteor/meteor";
import { useSubscribe, useTracker} from "meteor/react-meteor-data"
import { Home } from './Home';
import { Button } from '@mui/material';
import ButtonUsage from './ButtonUsage';




export const App = () => {
  const isLoading = useSubscribe('userData');
  const user = useTracker(() => Meteor.users.findOne());


  return (<>
  {user ? <div>
    <Home username={user.username}/>
    <ButtonUsage/>
    </div> :<LoginForm/>}
  </>);
}
