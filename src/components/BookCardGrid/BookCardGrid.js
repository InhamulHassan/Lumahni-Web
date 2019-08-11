import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Typography, withStyles } from "@material-ui/core";

// Component styles
import styles from "./styles";

class BookCardGrid extends Component {
  render() {
    const { classes, className, book, bookGr, authorBookGr } = this.props;

    const rootClassName = classNames(classes.root, className);

    let bookObject = {};

    if (Object.keys(book).length > 0) {
      bookObject = {
        title: book.title,
        img_url: book.img,
        author: book.authors ? book.authors[0].name : ""
      };
    } else if (Object.keys(bookGr).length > 0) {
      bookObject = {
        title: bookGr.title,
        img_url: bookGr.image_url,
        author: bookGr.authors[0].name
      };
    } else if (Object.keys(authorBookGr).length > 0) {
      bookObject = {
        title: authorBookGr.title,
        img_url: authorBookGr.image_url,
        author: ""
      };
    }

    return (
      <div className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img
            alt={bookObject.title}
            className={classes.image}
            src={bookObject.img_url}
          />
        </div>
        <div className={classes.details}>
          <Typography className={classes.title} variant="h4">
            {bookObject.title}
          </Typography>
          <Typography className={classes.author} variant="subtitle2">
            {bookObject.author}
          </Typography>
        </div>
      </div>
    );
  }
}

BookCardGrid.defaultProps = {
  book: {},
  bookGr: {},
  authorBookGr: {}
};

BookCardGrid.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  book: PropTypes.object,
  bookGr: PropTypes.object,
  authorBookGr: PropTypes.object
};

export default withStyles(styles)(BookCardGrid);
