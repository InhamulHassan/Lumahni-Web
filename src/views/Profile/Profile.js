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
import { UserDetailView, UserProfileCard } from "../../components";

// Shared services
import {
  getUserDetails,
  resetGetUserDetails
} from "../../redux/actions/userDbAction";

// Component styles
import styles from "./styles";

class Profile extends Component {
  state = { tabIndex: 0 };

  componentDidMount() {
    this.props.getUserDetails();
  }

  componentWillUnmount() {
    this.props.resetGetUserDetails();
  }

  render() {
    const { classes, authUser, loading, error } = this.props;

    return (
      <CoreLayout title="Profile">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <UserProfileCard
                userDetails={authUser}
                loading={loading}
                error={error}
              />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <UserDetailView
                userDetails={authUser}
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

Profile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authUser: state.user.authUser,
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
)(withStyles(styles)(Profile));
