import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

const MainViewFooter = props => {
  const { classes, className, noDivider, children, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.noDivider]: noDivider
    },
    className
  );

  return (
    <div {...rest} className={rootClassName}>
      {children}
    </div>
  );
};

MainViewFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noDivider: PropTypes.bool
};

MainViewFooter.defaultProps = {
  noDivider: false
};

export default withStyles(styles)(MainViewFooter);
