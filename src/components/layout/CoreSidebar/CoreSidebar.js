import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material components, helpers
import {
  Avatar,
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

// External components
import { ListItemLink } from "../ListItemLink";

// Component styles
import styles from "./styles";

class CoreSidebar extends Component {
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
        <div className={classes.profile}>
          <Link to="/profile">
            <Avatar
              alt="Aryan Behzadi"
              className={classes.avatar}
              src="https://ui-avatars.com/api/?name=Aryan+Behzadi&size=256&bold=true"
            ></Avatar>
          </Link>
          <Typography className={classes.nameText} variant="h6">
            Aryan Behzadi
          </Typography>
          <Typography className={classes.bioText} variant="caption">
            Librarian
          </Typography>
        </div>
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
            to="/login"
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoreSidebar);
