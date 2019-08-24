import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Redux Helpers
import { connect } from "react-redux";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Custom components
import { NotificationSettings, PasswordSettings } from "../../components";

// Shared services
import {
  getUserDetails,
  resetGetUserDetails,
  passwordReset,
  resetPasswordReset
} from "../../redux/actions/userDbAction";

// Component styles
import styles from "./styles";

class Settings extends Component {
  componentDidMount() {
    this.props.getUserDetails();
  }

  componentWillUnmount() {
    this.props.resetPasswordReset();
  }

  render() {
    const {
      classes,
      authUser,
      passwordReset,
      resetSuccess,
      loading,
      error
    } = this.props;

    return (
      <CoreLayout title="Settings">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>
              <NotificationSettings />
            </Grid>
            <Grid item md={5} xs={12}>
              <PasswordSettings
                userDetails={authUser}
                resetSuccess={resetSuccess}
                passwordReset={passwordReset}
                loading={loading}
                error={error}
              />
            </Grid>
          </Grid>
        </div>
      </CoreLayout>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    authUser: state.user.authUser,
    resetSuccess: state.user.resetSuccess,
    loading: state.user.resetLoading,
    error: state.user.resetError
  };
};

const mapDispatchToProps = {
  getUserDetails,
  resetGetUserDetails,
  passwordReset,
  resetPasswordReset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));
