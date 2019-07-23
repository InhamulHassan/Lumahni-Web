import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Button, TextField, withStyles } from "@material-ui/core";

// Shared components
import {
  MainView,
  MainViewHeader,
  MainViewLabel,
  MainViewContent,
  MainViewFooter
} from "../core";

// Component styles
import styles from "./styles";

class PasswordSettings extends Component {
  state = {
    values: {
      password: "",
      confirm: ""
    }
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel subtitle="Update password" title="Password" />
        </MainViewHeader>
        <MainViewContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="Password"
              name="password"
              onChange={event =>
                this.handleFieldChange("password", event.target.value)
              }
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Confirm password"
              name="confirm"
              onChange={event =>
                this.handleFieldChange("confirm", event.target.value)
              }
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </form>
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          <Button color="primary" variant="outlined">
            Update
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

PasswordSettings.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PasswordSettings);
