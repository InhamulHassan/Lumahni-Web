import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { Typography, withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

class GenreCardBar extends Component {
  render() {
    const { classes, genre, onPress } = this.props;

    return (
      <div className={classes.imageWrapper} onClick={onPress}>
        <img alt={genre.abbrv} className={classes.image} src={genre.img_s} />
        <div className={classes.gradientOverlay}></div>
        <Typography className={classes.title} variant="h3">
          {genre.name}
        </Typography>
      </div>
    );
  }
}

GenreCardBar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  genre: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default withStyles(styles)(GenreCardBar);
