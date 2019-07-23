import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Typography, withStyles } from "@material-ui/core";

// // Material icons
// import {
//   AccessTime as AccessTimeIcon,
// } from "@material-ui/icons";

// Component styles
import styles from "./styles";

class BookCardGrid extends Component {
  render() {
    const { classes, className, book } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img alt={book.title} className={classes.image} src={book.img} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.title} variant="h4">
            {book.title}
          </Typography>
          <Typography className={classes.description} variant="body1">
            {book.descr}
          </Typography>
        </div>
      </div>
    );
  }
}

BookCardGrid.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired
};

export default withStyles(styles)(BookCardGrid);
