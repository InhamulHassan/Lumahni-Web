import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

// Externals
import classNames from "classnames";
import compose from "recompose/compose";
import PropTypes from "prop-types";

// Material components, helpers
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from "@material-ui/icons";

// Shared services
import { getNotifications } from "../../../data/Notifications";

// Custom components
import { NotificationModal } from "../../../components/NotificationModal";

// Component styles
import styles from "./styles";

class CoreHeader extends Component {
  signal = true;

  state = {
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 0,
    notificationsEl: null
  };

  async getNotifications() {
    try {
      const { notificationsLimit } = this.state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (this.signal) {
        this.setState({
          notifications,
          notificationsCount
        });
      }
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getNotifications();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSignOut = () => {
    const { history } = this.props;

    history.push("/logout");
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
  };

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;
    const { notifications, notificationsCount, notificationsEl } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <Tooltip title={isSidebarOpen ? "Close Menu" : "Open Menu"} aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}>
              <IconButton
                className={classes.menuButton}
                onClick={onToggleSidebar}
                variant="text"
                tooltip="Close"
              >
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
            <Typography className={classes.title} variant="h4">
              {title}
            </Typography>
            <Tooltip title="Notifications" aria-label="Notifications">
              <IconButton
                className={classes.notificationsButton}
                onClick={this.handleShowNotifications}
                tooltip="Notifications"
              >
                <Badge
                  badgeContent={notificationsCount}
                  color="primary"
                  variant="dot"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" aria-label="Logout">
              <IconButton
                className={classes.signOutButton}
                onClick={this.handleSignOut}
              >
                <InputIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <NotificationModal
            notifications={notifications}
            onSelect={this.handleCloseNotifications}
          />
        </Popover>
      </Fragment>
    );
  }
}

CoreHeader.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

CoreHeader.defaultProps = {
  onToggleSidebar: () => {}
};

export default compose(
  withRouter,
  withStyles(styles)
)(CoreHeader);
