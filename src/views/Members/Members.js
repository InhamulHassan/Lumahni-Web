import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { CircularProgress, Typography, withStyles } from "@material-ui/core";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Shared services
import { getUsers } from "../../data/Users";

// Custom components
import { MembersTableList, MembersToolbar } from "../../components";

// Component styles
import styles from "./styles";

class Members extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    error: null
  };

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { users } = await getUsers(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return <MembersTableList onSelect={this.handleSelect} users={users} />;
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;

    return (
      <CoreLayout title="Users">
        <div className={classes.root}>
          <MembersToolbar selectedUsers={selectedUsers} />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </CoreLayout>
    );
  }
}

Members.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Members);
