import React from 'react';
import { LoginForm } from './LoginForm';
import {Meteor} from "meteor/meteor";
import { useTracker} from "meteor/react-meteor-data"
import { Home } from './Home';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (<>
  {user ? <Home username={user.username}/> :<LoginForm/>}
  </>);
}
