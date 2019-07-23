import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Divider, Typography, withStyles } from "@material-ui/core";

// Material icons
import {
  FavoriteOutlined as FavouriteIcon,
  CodeOutlined as CodeIcon
} from "@material-ui/icons";

// Component styles
import styles from "./styles";

class CoreFooter extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Divider />
        <Typography className={classes.company} variant="body1">
          &copy; 2019 Lumahni
        </Typography>
        <Typography variant="caption">
          <CodeIcon className={classes.icon} /> with{" "}
          <FavouriteIcon className={classes.icon} /> from Inhamul.
        </Typography>
      </div>
    );
  }
}

CoreFooter.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoreFooter);
