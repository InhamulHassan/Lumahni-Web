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
  constructor(props) {
    super(props);

    this.state = {
      firstName: "John",
      lastName: "Doe",
      email: "contact@lumahni.io",
      phone: "+94770022063",
      city: "Colombo",
      province: "Western"
    };
  }


  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  render() {
    const { classes, className, userDetails, loading, error } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
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
                value={userDetails.first_name}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Last name"
                required
                value={userDetails.last_name}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                required
                value={userDetails.email_address}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Mobile Number"
                type="number"
                value={userDetails.mobile_number}
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
                value={this.state.city}
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
                value={""}
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
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default withStyles(styles)(UserDetailView);
