import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";

// Redux Helpers
import { connect } from "react-redux";

// Material components
import {
  Grid,
  CircularProgress,
  Typography,
  withStyles
} from "@material-ui/core";

// Shared services
import { userLogout, resetUserLogout } from "../../redux/actions/userDbAction";

// Component styles
import styles from "./styles";

class Logout extends Component {
  componentDidMount() {
    this.props.userLogout();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.authToken !== this.props.authToken) {
      this.props.history.push("/login");
    }
  }

  componentWillUnmount() {
    this.props.resetUserLogout();
  }

  render() {
    const { classes, loading, error } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.gridItem} item lg={12} md={12} xs={12}>
            <div>
              {loading && (
                <div className={classes.progressWrapper}>
                  <CircularProgress className={classes.circularProgress} />
                </div>
              )}
              {error && (
                <div className={classes.errorWrapper}>
                  <Typography variant="h4">{error}</Typography>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Logout.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    authToken: state.user.authToken,
    loading: state.user.dataLoading,
    error: state.user.error
  };
};

const mapDispatchToProps = {
  userLogout,
  resetUserLogout
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Logout))
);
