import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// // Material components, helpers
// import {
//   Avatar,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   ListSubheader,
//   Typography,
//   withStyles
// } from "@material-ui/core";

// Material components, helpers
import {
  Avatar,
  Divider,
  List,
  ListSubheader,
  Typography,
  withStyles
} from "@material-ui/core";

// Material icons
// import {
//   DashboardOutlined as DashboardIcon,
//   PeopleOutlined as PeopleIcon,
//   ShoppingBasketOutlined as ShoppingBasketIcon,
//   LockOpenOutlined as LockOpenIcon,
//   TextFields as TextFieldsIcon,
//   ImageOutlined as ImageIcon,
//   InfoOutlined as InfoIcon,
//   AccountBoxOutlined as AccountBoxIcon,
//   SettingsOutlined as SettingsIcon
// } from "@material-ui/icons";

import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as MemberIcon,
  CollectionsBookmarkOutlined as BookGenreIcon,
  AccountBoxOutlined as ProfileIcon,
  SettingsOutlined as SettingsIcon,
  PowerSettingsNewOutlined as LogoutIcon
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
              src="/images/avatars/avatar_1.png"
            />
          </Link>
          <Typography className={classes.nameText} variant="h6">
            Aryan Behzadi
          </Typography>
          <Typography className={classes.bioText} variant="caption">
            Reader
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
            to="/genre"
            primaryAttribute="Genre"
            icon={<BookGenreIcon />}
          />
          <ListItemLink
            to="/members"
            primaryAttribute="Members"
            icon={<MemberIcon />}
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
