import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material , components, helpers
import { Tooltip, withStyles } from "@material-ui/core";

// Material components
import { List as ListIcon, Apps as AppsIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

const DisplayModeView = props => {
  const { classes, className, mode, onChange } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <span
        className={classNames({
          [classes.option]: true,
          [classes.optionSelected]: mode === "grid"
        })}
        onClick={onChange}
      >
        <Tooltip title="Grid View" aria-label="Grid View" placement="bottom">
          <AppsIcon className={classes.displayIcon} />
        </Tooltip>
      </span>
      <span className={classes.divider} />
      <span
        className={classNames({
          [classes.option]: true,
          [classes.optionSelected]: mode === "list"
        })}
        onClick={onChange}
      >
        <Tooltip title="List View" aria-label="List View" placement="bottom">
          <ListIcon className={classes.displayIcon} />
        </Tooltip>
      </span>
    </div>
  );
};

DisplayModeView.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(["grid", "list"]),
  onChange: PropTypes.func
};

DisplayModeView.defaultProps = {
  mode: "grid",
  onChange: () => {}
};

export default withStyles(styles)(DisplayModeView);
