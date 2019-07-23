import React from "react";
// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Paper, withStyles } from "@material-ui/core";

import styles from "./styles";

const PaperView = props => {
  const { classes, className, outlined, squared, children, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );

  return (
    <Paper {...rest} className={rootClassName}>
      {children}
    </Paper>
  );
};

PaperView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool
};

PaperView.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 0
};

export default withStyles(styles)(PaperView);
