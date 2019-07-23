import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

const MainViewToolbar = props => {
  const { classes, className, children, ...rest } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div {...rest} className={rootClassName}>
      children
    </div>
  );
};

MainViewToolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainViewToolbar);
