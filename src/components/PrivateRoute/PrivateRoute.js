import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  user,
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!localStorage.getItem("auth_token")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(user.user_role) === -1) {
        console.log("Access Restricted due to being a " + user.user_role);
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      return <Component {...props} />;
    }}
  />
);
