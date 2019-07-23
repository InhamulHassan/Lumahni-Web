import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Checkbox, Typography, Button, withStyles } from "@material-ui/core";

// Shared components
import {
  MainView,
  MainViewHeader,
  MainViewLabel,
  MainViewContent,
  MainViewFooter
} from "../core";

// Component styles
import styles from "./styles";

class NotificationSettings extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel
            subtitle="Manage the notifications"
            title="Notifications"
          />
        </MainViewHeader>
        <MainViewContent noPadding>
          <form className={classes.form}>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Notifications
              </Typography>
              <div className={classes.field}>
                <Checkbox color="primary" />
                <div>
                  <Typography variant="body1">Email</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox color="primary" defaultChecked />
                <div>
                  <Typography variant="body1">Push Notifications</Typography>
                  <Typography variant="caption">
                    For your mobile or tablet device
                  </Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox color="primary" defaultChecked />
                <div>
                  <Typography variant="body1">Text Messages</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox color="primary" defaultChecked />
                <div>
                  <Typography variant="body1">Phone calls</Typography>
                </div>
              </div>
            </div>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Messages
              </Typography>
              <div className={classes.field}>
                <Checkbox color="primary" />
                <div>
                  <Typography variant="body1">Email</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox color="primary" />
                <div>
                  <Typography variant="body1">Push Notifications</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox color="primary" defaultChecked />
                <div>
                  <Typography variant="body1">Phone calls</Typography>
                </div>
              </div>
            </div>
          </form>
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          <Button color="primary" variant="outlined">
            Save
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

NotificationSettings.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationSettings);
