import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Private Route Component
import { PrivateRoute } from "./components";

import { Login } from "./views/Login";
import { Logout } from "./views/Logout";
import { Home } from "./views/Home";
import { Books } from "./views/Books";
import { Genres } from "./views/Genres";
import { Authors } from "./views/Authors";
import { Book } from "./views/Book";
import { Author } from "./views/Author";
import { Profile } from "./views/Profile";
import { Settings } from "./views/Settings";
import { Members } from "./views/Members";
import { NotFound } from "./views/NotFound";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route component={Login} exact path="/login" />
        <PrivateRoute component={Logout} exact path="/logout" />
        <PrivateRoute component={Home} exact path="/home" />
        <PrivateRoute component={Books} exact path="/books" />
        <PrivateRoute component={Genres} exact path="/genres" />
        <PrivateRoute component={Authors} exact path="/authors" />
        <PrivateRoute component={Book} exact path="/book" />
        <PrivateRoute component={Author} exact path="/author" />
        <PrivateRoute component={Profile} exact path="/profile" />
        <PrivateRoute component={Settings} exact path="/settings" />
        <PrivateRoute component={Members} exact path="/members" />
        <PrivateRoute component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
