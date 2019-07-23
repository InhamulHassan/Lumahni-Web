import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import {
  Avatar,
  Typography,
  Button,
  LinearProgress,
  withStyles
} from "@material-ui/core";

// Shared components
import { MainView, MainViewContent, MainViewFooter } from "../core";

// Component styles
import styles from "./styles";

class UserProfileCard extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <MainViewContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">John Doe</Typography>
              <Typography className={classes.locationText} variant="body1">
                Rm. Valcea, Romania
              </Typography>
              <Typography className={classes.dateText} variant="body1">
                4:32PM (GMT-4)
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Profile Completeness: 70%</Typography>
            <LinearProgress className={classes.linearProgress} value={70} variant="determinate" />
          </div>
        </MainViewContent>
        <MainViewFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

UserProfileCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfileCard);
