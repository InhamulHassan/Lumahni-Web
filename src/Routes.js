import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Externals
import PropTypes from "prop-types";

// Redux Helpers
import { connect } from "react-redux";

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

// Shared services
import {
  getUserDetails,
  resetGetUserDetails
} from "./redux/actions/userDbAction";

import userRoles from "./helpers/userRoles";

class Routes extends Component {
  componentDidMount() {
    if (localStorage.getItem("auth_token")) {
      this.props.getUserDetails();
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (localStorage.getItem("auth_token") && !this.props.authUser) {
      this.props.getUserDetails();
      console.log("authToken present but state empty");
    }
    console.log('route update')
  }

  render() {
    const { authUser, loading, error } = this.props;

    return (
      <Switch>
        <Route component={Login} exact path="/login" />
        <PrivateRoute
          component={Home}
          user={authUser}
          roles={[
            userRoles.Administrator,
            userRoles.Librarian,
            userRoles.Member
          ]}
          exact
          path="/home"
        />
        {authUser && localStorage.getItem("auth_token") ? (
          <Redirect exact from="/" to="/home" />
        ) : (
          <Redirect exact from="/" to="/login" />
        )}
        <PrivateRoute
          component={Books}
          user={authUser}
          roles={[
            userRoles.Administrator,
            userRoles.Librarian,
            userRoles.Member
          ]}
          exact
          path="/books"
        />
        <PrivateRoute
          component={Genres}
          user={authUser}
          roles={[
            userRoles.Administrator,
            userRoles.Librarian,
            userRoles.Member
          ]}
          exact
          path="/genres"
        />
        <PrivateRoute
          component={Authors}
          user={authUser}
          roles={[
            userRoles.Administrator,
            userRoles.Librarian,
            userRoles.Member
          ]}
          exact
          path="/authors"
        />
        <PrivateRoute
          component={Book}
          user={authUser}
          roles={[
            userRoles.Administrator,
            userRoles.Librarian,
            userRoles.Member
          ]}
          exact
          path="/book"
        />
        <PrivateRoute
          component={Author}
          user={authUser}
          roles={[
            userRoles.Administrator,
            userRoles.Librarian,
            userRoles.Member
          ]}
          exact
          path="/author"
        />
        <PrivateRoute
          component={Profile}
          user={authUser}
          roles={[userRoles.Member]}
          exact
          path="/profile"
        />
        <PrivateRoute
          component={Settings}
          user={authUser}
          roles={[userRoles.Member]}
          exact
          path="/settings"
        />
        <PrivateRoute
          component={Members}
          user={authUser}
          roles={[userRoles.Administrator, userRoles.Librarian]}
          exact
          path="/members"
        />
        <Route component={Logout} exact path="/logout" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

Members.propTypes = {
  authUser: PropTypes.object.isRequired,
  authToken: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authUser: state.user.authUser,
    authToken: state.user.authToken,
    loading: state.user.dataLoading,
    error: state.user.error
  };
};

const mapDispatchToProps = {
  getUserDetails,
  resetGetUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
