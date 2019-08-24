import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";
import validate from "validate.js";

// Material components, helpers
import {
  CircularProgress,
  IconButton,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

// Material icons
import {
  PersonRounded as PersonIcon,
  LockRounded as LockIcon,
  ErrorOutlineRounded as ErrorIcon,
  VisibilityRounded as VisibilityIcon,
  VisibilityOffRounded as VisibilityOffIcon
} from "@material-ui/icons";

// Shared components
import {
  MainView,
  MainViewContent,
} from "../core";

import { LoginInputText } from "../LoginInputText";

// Shared services
import { userLogin, resetUserLogin } from "../../redux/actions/userDbAction";

// Form validation schema
import validateSchema from "./validateSchema";

// Component styles
import styles from "./styles";

class LoginFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordVisibility: false,
      errors: {},
      isValid: true
    };
  }

  handleClickShowPassword = () => {
    const { passwordVisibility } = this.state;
    this.setState({
      passwordVisibility: !passwordVisibility
    });
  };

  validateForm = data => {
    const newState = { ...this.state };
    const errors = validate(data, validateSchema);

    newState.errors = errors || false;
    newState.isValid = errors ? false : true;

    this.setState(newState);

    if (!errors) {
      this.props.handleLogin(data);
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    const formData = {
      username,
      password
    };

    this.validateForm(formData);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getSubmitErrorMessage = () => {
    const { isValid, errors } = this.state;
    const { classes } = this.props;

    return (
      !isValid && (
        <Typography className={classes.fieldError} variant="body2">
          <ErrorIcon className={classes.errorIcon} />
          {Object.keys(errors).length +
            (Object.keys(errors).length <= 1 ? " error has" : " errors have") +
            " been found"}
        </Typography>
      )
    );
  };

  getLoginErrorMessage = () => {
    const { classes, authError } = this.props;

    return (
      authError && (
        <Typography className={classes.fieldError} variant="body2">
          <ErrorIcon className={classes.errorIcon} />
          {authError}
        </Typography>
      )
    );
  };

  render() {
    const { classes, className, authLoading } = this.props;
    const {
      errors,
      username,
      password,
      passwordVisibility
    } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewContent className={classes.content} noPadding>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <div className={classes.formContainer}>
              <div className={classes.field}>
                <LoginInputText
                  name="username"
                  placeholder="Username"
                  type="text"
                  required
                  value={username}
                  onChange={this.handleChange}
                  startIcon={<PersonIcon />}
                />
                {errors.username && (
                  <Typography className={classes.fieldError} variant="body2">
                    <ErrorIcon className={classes.errorIcon} />
                    {errors.username[0]}
                  </Typography>
                )}
              </div>
              <div className={classes.field}>
                <LoginInputText
                  name="password"
                  placeholder="Password"
                  type={passwordVisibility ? "text" : "password"}
                  required
                  value={password}
                  onChange={this.handleChange}
                  startIcon={<LockIcon />}
                  endIconButton={
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {passwordVisibility ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  }
                />
                {errors.password && (
                  <Typography className={classes.fieldError} variant="body2">
                    <ErrorIcon className={classes.errorIcon} />
                    {errors.password[0]}
                  </Typography>
                )}
              </div>
              <div className={classes.errorContainer}>
                {this.getSubmitErrorMessage()}
                {this.getLoginErrorMessage()}
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.onSubmit}
                  className={classes.signInButton}
                  disabled={authLoading}
                >
                  {authLoading ? "" : "Login"}
                </Button>
                {authLoading && (
                  <CircularProgress size={20} className={classes.buttonProgress} />
                )}
              </div>
            </div>
          </form>
        </MainViewContent>
      </MainView>
    );
  }
}

LoginFormComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    accessToken: state.user.accessToken,
    authLoading: state.user.dataLoading,
    error: state.user.error
  };
};

const mapDispatchToProps = {
  userLogin,
  resetUserLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginFormComponent));
