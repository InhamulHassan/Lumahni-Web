import React, { Component, Fragment } from "react";

// Externals
import classNames from "classnames";
import compose from "recompose/compose";
import PropTypes from "prop-types";

// Redux Helpers
import { connect } from "react-redux";

// Material helpers
import { withStyles, withWidth } from "@material-ui/core";

// Material components
import { Drawer } from "@material-ui/core";

// Custom components
import { CoreHeader, CoreFooter, CoreSidebar } from "../../components/layout";

// Shared services
import {
  getUserDetails,
  resetGetUserDetails
} from "../../redux/actions/userDbAction";

// Component styles
import styles from "./styles";

class CoreLayout extends Component {
  constructor(props) {
    super(props);

    const isMobile = ["xs", "sm", "md"].includes(props.width);

    this.state = {
      isOpen: !isMobile
    };
  }

  componentDidMount() {
    this.props.getUserDetails();
  }

  componentWillUnmount() {
    this.props.resetGetUserDetails();
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleToggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const {
      classes,
      authUser,
      loading,
      error,
      width,
      title,
      children
    } = this.props;
    const { isOpen } = this.state;

    const isMobile = ["xs", "sm", "md"].includes(width);
    const shiftTopbar = isOpen && !isMobile;
    const shiftContent = isOpen && !isMobile;

    return (
      <Fragment>
        <CoreHeader
          className={classNames(classes.header, {
            [classes.headerShift]: shiftTopbar
          })}
          isSidebarOpen={isOpen}
          onToggleSidebar={this.handleToggleOpen}
          title={title}
        />
        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={this.handleClose}
          open={isOpen}
          variant={isMobile ? "temporary" : "persistent"}
        >
          <CoreSidebar
            className={classes.sidebar}
            userDetails={authUser}
            loading={loading}
            error={error}
          />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: shiftContent
          })}
        >
          {children}
          <CoreFooter />
        </main>
      </Fragment>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired,
  authUser: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authUser: state.user.authUser,
    loading: state.user.dataLoading,
    error: state.user.error
  };
};

const mapDispatchToProps = {
  getUserDetails,
  resetGetUserDetails
};

export default compose(
  withWidth(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CoreLayout);
