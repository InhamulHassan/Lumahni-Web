import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

// Shared components
import { PaperView } from "../PaperView";

const MainView = props => {
  const { classes, className, children, ...rest } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <PaperView
      {...rest}
      className={rootClassName}
      elevation={0}
      outlined
      squared={false}
    >
      {children}
    </PaperView>
  );
};

MainView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainView);
