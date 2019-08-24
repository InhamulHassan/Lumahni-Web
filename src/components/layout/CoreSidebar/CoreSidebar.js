import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material components, helpers
import {
  Avatar,
  CircularProgress,
  Divider,
  List,
  ListSubheader,
  Typography,
  withStyles
} from "@material-ui/core";

import {
  DashboardRounded as DashboardIcon,
  LibraryBooksRounded as BooksIcon,
  PeopleRounded as MembersIcon,
  PersonRounded as AuthorsIcon,
  CollectionsBookmarkRounded as GenresIcon,
  AccountBoxRounded as ProfileIcon,
  SettingsRounded as SettingsIcon,
  PowerSettingsNewRounded as LogoutIcon
} from "@material-ui/icons";

import getInitials from "../../../helpers/getInitials";

// External components
import { ListItemLink } from "../ListItemLink";

// Component styles
import styles from "./styles";

class CoreSidebar extends Component {
  renderUserDetails = () => {
    const { classes, userDetails, loading, error } = this.props;

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress size={20} />
        </div>
      );
    }

    if (error) {
      return <div className={classes.errorWrapper}>{error}</div>;
    }

    if (Object.keys(userDetails).length > 0) {
      let fullName = userDetails.full_name;
      let userRole = userDetails.user_role;

      return (
        <div className={classes.profile}>
          <Link to="/profile" className={classes.logoLink}>
            <Avatar alt={fullName} className={classes.avatar}>
              {getInitials(fullName)}
            </Avatar>
          </Link>
          <Typography className={classes.nameText} variant="h6">
            {fullName}
          </Typography>
          <Typography className={classes.bioText} variant="caption">
            {userRole}
          </Typography>
        </div>
      );
    }
  };

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="/">
            <img
              alt="Lumahni Logo"
              className={classes.logoImage}
              src="/images/logos/lumahni_logo.png"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        {this.renderUserDetails()}
        <Divider className={classes.profileDivider} />
        <List component="div" disablePadding>
          <ListItemLink
            to="/home"
            primaryAttribute="Home"
            icon={<DashboardIcon />}
          />
          <ListItemLink
            to="/books"
            primaryAttribute="Books"
            icon={<BooksIcon />}
          />
          <ListItemLink
            to="/genres"
            primaryAttribute="Genre"
            icon={<GenresIcon />}
          />
          <ListItemLink
            to="/authors"
            primaryAttribute="Authors"
            icon={<AuthorsIcon />}
          />
          <ListItemLink
            to="/members"
            primaryAttribute="Members"
            icon={<MembersIcon />}
          />
          <ListItemLink
            to="/profile"
            primaryAttribute="Profile"
            icon={<ProfileIcon />}
          />
        </List>
        <Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Preferences
            </ListSubheader>
          }
        >
          <ListItemLink
            to="/settings"
            primaryAttribute="Settings"
            icon={<SettingsIcon />}
          />
          <ListItemLink
            to="/logout"
            primaryAttribute="Logout"
            icon={<LogoutIcon />}
          />
        </List>
      </nav>
    );
  }
}

CoreSidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default withStyles(styles)(CoreSidebar);
