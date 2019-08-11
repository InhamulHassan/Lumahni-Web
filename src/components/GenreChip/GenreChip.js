import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { Typography, withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

class GenreChip extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {
    text: ""
  };

  render() {
    const { classes, text } = this.props;

    return (
      <div className={classes.genreChipContainer}>
        <Typography className={classes.genreChipText}>{text}</Typography>
      </div>
    );
  }
}

GenreChip.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenreChip);
