import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { IconButton, Tooltip, withStyles } from "@material-ui/core";

// Material icons
import {
  ArrowForwardIosRounded as NextIcon,
  ArrowBackIosRounded as PrevIcon
} from "@material-ui/icons";

// Component styles
import styles from "./styles";

class ArrowIconButton extends Component {
  render() {
    const { classes, isPrev, onClick } = this.props;
    const style = isPrev ? { left: "-15px" } : { right: "-15px" };
    const toolTip = isPrev ? "Previous" : "Next";

    return (
      <Tooltip title={toolTip} aria-label={toolTip}>
        <IconButton
          className={classes.iconButton}
          style={style}
          onClick={onClick}
          size="medium"
        >
          {isPrev ? (
            <PrevIcon fontSize="small" />
          ) : (
            <NextIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    );
  }
}

ArrowIconButton.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  isPrev: PropTypes.bool.isRequired
};

ArrowIconButton.defaultProps = {
  isPrev: false
};

export default withStyles(styles)(ArrowIconButton);
