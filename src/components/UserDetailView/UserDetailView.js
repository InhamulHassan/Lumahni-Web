import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material components, helpers
import { Button, TextField, withStyles } from "@material-ui/core";

// Shared components
import {
  MainView,
  MainViewContent,
  MainViewFooter,
  MainViewHeader,
  MainViewLabel
} from "../core";

// Component styles
import styles from "./styles";

const cityList = [
  {
    value: "colombo",
    label: "Colombo"
  },
  {
    value: "galle",
    label: "Galle"
  },
  {
    value: "kandy",
    label: "Kandy"
  },
  {
    value: "trincomalee",
    label: "Trincomalee"
  },
  {
    value: "jaffna",
    label: "Jaffna"
  },
  {
    value: "hambantota",
    label: "Hambantota"
  }
];

class UserDetailView extends Component {
  state = {
    firstName: "John",
    lastName: "Doe",
    email: "contact@lumahni.io",
    phone: "+94770022063",
    city: "Colombo",
    province: "Western"
  };

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { firstName, lastName, phone, city, province, email } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel
            subtitle="The information can be edited"
            title="Profile"
          />
        </MainViewHeader>
        <MainViewContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the first name"
                label="First name"
                required
                value={firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Last name"
                required
                value={lastName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                required
                value={email}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Phone Number"
                type="number"
                value={phone}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Select City"
                onChange={this.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={city}
                variant="outlined"
              >
                {cityList.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                className={classes.textField}
                label="Provice"
                required
                value={province}
                variant="outlined"
              />
            </div>
          </form>
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

UserDetailView.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDetailView);
