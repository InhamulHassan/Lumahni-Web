import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";

// Component styles
import styles from "./styles";

class ListItemLink extends Component {

  renderLink = React.forwardRef((itemProps, ref) => (
    // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    <NavLink to={this.props.to} {...itemProps} innerRef={ref} />
  ));

  render() {
    const { icon, primaryAttribute, classes } = this.props;

    return (
      <li>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          button
          component={this.renderLink}
        >
          <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.listItemText
            }}
            primary={primaryAttribute}
          />
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primaryAttribute: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

export default withStyles(styles)(ListItemLink);
