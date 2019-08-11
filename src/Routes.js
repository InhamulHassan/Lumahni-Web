import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from "./views/Home";
import { Books } from "./views/Books";
import { Genres } from "./views/Genres";
import { Authors } from "./views/Authors";
import { Book } from "./views/Book";
import { Genre } from "./views/Genre";
import { Author } from "./views/Author";
import { Profile } from "./views/Profile";
import { Settings } from "./views/Settings";
import { Login } from "./views/Login";
import { Members } from "./views/Members";
import { NotFound } from "./views/NotFound";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route component={Home} exact path="/home" />
        <Route component={Books} exact path="/books" />
        <Route component={Genres} exact path="/genres" />
        <Route component={Authors} exact path="/authors" />
        <Route component={Book} exact path="/book" />
        <Route component={Genre} exact path="/genre" />
        <Route component={Author} exact path="/author" />
        <Route component={Profile} exact path="/profile" />
        <Route component={Settings} exact path="/settings" />
        <Route component={Login} exact path="/login" />
        <Route component={Members} exact path="/members" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
