import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import {
  Divider,
  Icon,
  IconButton,
  InputBase,
  Paper,
  withStyles
} from "@material-ui/core";

// Component styles
import styles from "./styles";

class LoginInputText extends Component {
  render() {
    const { classes, startIcon, endIconButton, ...inputBaseProps } = this.props;

    return (
      <Paper className={classes.root}>
        <Icon className={classes.inputIcon}>{startIcon}</Icon>
        <Divider className={classes.divider} />
        <InputBase className={classes.input} {...inputBaseProps} />
        {endIconButton && <div>{endIconButton}</div>}
      </Paper>
    );
  }
}

LoginInputText.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

LoginInputText.defaultProps = {};

export default withStyles(styles)(LoginInputText);
