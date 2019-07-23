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
import { NotificationSettings, PasswordSettings } from "../../components";

// Component styles
import styles from "./styles";

class Settings extends Component {
  render() {
    const { classes } = this.props;

    return (
      <CoreLayout title="Settings">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>
              <NotificationSettings />
            </Grid>
            <Grid item md={5} xs={12}>
              <PasswordSettings />
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

export default withStyles(styles)(Settings);
