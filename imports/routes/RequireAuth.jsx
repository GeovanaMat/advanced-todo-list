import React from "react";
import {Meteor} from 'meteor/meteor'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

export function RequireAuth({ children }) {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const loggingIn = useTracker(() => Meteor.loggingIn());
    const location = useLocation();


    if (!user  && !loggingIn) {
        return <Navigate to="/" replace state={{ path: location.pathname }} />
    }

    return children;

  }