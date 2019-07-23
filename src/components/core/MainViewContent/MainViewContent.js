import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

const MainViewContent = props => {
  const { classes, className, children, noPadding, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
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

MainViewContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noPadding: PropTypes.bool
};

MainViewContent.defaultProps = {
  noPadding: false
};

export default withStyles(styles)(MainViewContent);
