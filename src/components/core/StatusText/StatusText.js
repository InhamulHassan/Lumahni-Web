import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

import styles from "./styles";

const StatusText = props => {
  const { classes, className, size, color, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes[size]]: size,
      [classes[color]]: color
    },
    className
  );

  return <span {...rest} className={rootClassName} />;
};

StatusText.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "neutral",
    "primary",
    "info",
    "success",
    "warning",
    "danger"
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

StatusText.defaultProps = {
  size: "md",
  color: "default"
};

export default withStyles(styles)(StatusText);
