import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { Typography, withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

class GenreCardBar extends Component {
  render() {
    const { classes, genre } = this.props;
    const imgSrc = `${process.env.REACT_APP_DEVELOPMENT_SERVER_URL}/assets/images/${genre.img_s}.jpg`;


    return (
      <div className={classes.imageWrapper}>
        <img
          alt={genre.abbrv}
          className={classes.image}
          src={imgSrc}
        />
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenreCardBar);
