import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";
import validate from "validate.js";

// Material components, helpers
import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";

// Material icons
import {
  ErrorOutlineRounded as ErrorIcon,
  CheckCircleOutlineRounded as SuccessIcon
} from "@material-ui/icons";

// Shared components
import {
  MainView,
  MainViewHeader,
  MainViewLabel,
  MainViewContent,
  MainViewFooter
} from "../core";

// Form validation schema
import validateSchema from "./validateSchema";

// Component styles
import styles from "./styles";

class PasswordSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password: "",
      confirm_password: "",
      errors: {},
      isValid: true
    };
  }

  validateForm = data => {
    const newState = { ...this.state };
    const errors = validate(data, validateSchema);

    newState.errors = errors || false;
    newState.isValid = errors ? false : true;

    this.setState(newState);

    if (!errors) {
      this.props.passwordReset(data);
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const { old_password, new_password, confirm_password } = this.state;
    const { id, username } = this.props.userDetails;

    const formData = {
      id,
      username,
      old_password,
      new_password,
      confirm_password
    };

    this.validateForm(formData);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getSubmitMessage = () => {
    const { classes, resetSuccess, error } = this.props;

    if (resetSuccess) {
      return (
        <Typography className={classes.fieldSuccess} variant="body2">
          <SuccessIcon className={classes.successIcon} />
          Password reset successfull!
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography className={classes.fieldError} variant="body2">
          <ErrorIcon className={classes.errorIcon} />
          {error}
        </Typography>
      );
    }
  };

  render() {
    const { classes, className, loading, error } = this.props;
    const { errors, old_password, new_password, confirm_password } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel subtitle="Update password" title="Password" />
        </MainViewHeader>
        <MainViewContent>
          {loading && (
            <div className={classes.progressContainer}>
              <CircularProgress size={100} />
            </div>
          )}
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="Old Password"
              name="old_password"
              onChange={this.handleChange}
              type="password"
              value={old_password}
              variant="outlined"
            />
            {errors.old_password && (
              <Typography className={classes.fieldError} variant="body2">
                <ErrorIcon className={classes.errorIcon} />
                {errors.old_password[0]}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              label="New Password"
              name="new_password"
              onChange={this.handleChange}
              type="password"
              value={new_password}
              variant="outlined"
            />
            {errors.new_password && (
              <Typography className={classes.fieldError} variant="body2">
                <ErrorIcon className={classes.errorIcon} />
                {errors.new_password[0]}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              label="Confirm password"
              name="confirm_password"
              onChange={this.handleChange}
              type="password"
              value={confirm_password}
              variant="outlined"
            />
            {errors.confirm_password && (
              <Typography className={classes.fieldError} variant="body2">
                <ErrorIcon className={classes.errorIcon} />
                {errors.confirm_password[0]}
              </Typography>
            )}
          </form>
          {this.getSubmitMessage()}
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          <Button color="primary" variant="outlined" onClick={this.onSubmit}>
            Reset Password
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

PasswordSettings.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  passwordReset: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  resetSuccess: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default withStyles(styles)(PasswordSettings);
