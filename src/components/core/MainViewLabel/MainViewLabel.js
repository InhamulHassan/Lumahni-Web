import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Typography, withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

const MainViewLabel = props => {
  const { classes, className, icon, title, subtitle, ...rest } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div {...rest} className={rootClassName}>
      {icon && <span className={classes.icon}>{icon}</span>}
      {title && (
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography className={classes.subtitle} variant="subtitle2">
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

MainViewLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  icon: PropTypes.node,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(styles)(MainViewLabel);
