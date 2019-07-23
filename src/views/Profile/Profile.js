import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Custom components
import { UserDetailView, UserProfileCard } from '../../components';

// Component styles
import styles from "./styles";

class Profile extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes } = this.props;

    return (
      <CoreLayout title="Profile">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <UserProfileCard />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <UserDetailView />
            </Grid>
          </Grid>
        </div>
      </CoreLayout>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
