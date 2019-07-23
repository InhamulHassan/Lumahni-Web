import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

const MainViewHeader = props => {
  const { classes, className, noDivider, noPadding, children, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.noDivider]: noDivider,
      [classes.noPadding]: noPadding
    },
    className
  );

  return (
    <div {...rest} className={rootClassName}>
      {children}
    </div>
  );
};

MainViewHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noDivider: PropTypes.bool,
  noPadding: PropTypes.bool
};

MainViewHeader.defaultProps = {
  noDivider: false,
  noPadding: false
};

export default withStyles(styles)(MainViewHeader);
