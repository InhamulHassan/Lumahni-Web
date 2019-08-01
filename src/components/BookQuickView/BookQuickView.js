import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Button, Typography, withStyles } from "@material-ui/core";

// Shared components
import { MainView } from "../core";

// Component styles
import styles from "./styles";

class BookQuickView extends Component {
  renderAuthors() {
    const { classes, bookGRData } = this.props;

    if (!Object.keys(bookGRData).length > 0) return null;

    return (
      <div className={classes.gridContainer}>
        {bookGRData.authors.map(author => (
          <div key={author.id} className={classes.authorContainer}>
            <Typography
              className={classes.author}
              variant="body1"
            >
              {author.name}
            </Typography>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      classes,
      className,
      bookGRData,
      populateFields,
      ...rest
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <div className={classes.details}>
          <div className={classes.imageWrapper}>
            <img
              alt={bookGRData.title}
              className={classes.image}
              src={bookGRData.image_url}
            />
          </div>
          <div className={classes.info}>
            <Typography className={classes.title} variant="h3">
              {bookGRData.title}
            </Typography>
            <Typography className={classes.generalText} variant="body1">
              ISBN: {bookGRData.isbn ? bookGRData.isbn : "Not Specified"}
            </Typography>
            <Typography className={classes.generalText} variant="body1">
              ISBN13: {bookGRData.isbn13 ? bookGRData.isbn13 : "Not Specified"}
            </Typography>
            <div className={classes.authors}>
              {Object.keys(bookGRData).length > 0 ? "by:" : ""}
              {this.renderAuthors()}
            </div>
          </div>
        </div>
        <Button color="primary" variant="contained" onClick={populateFields}>
          Populate Fields
        </Button>
      </MainView>
    );
  }
}

BookQuickView.defaultProps = {
  bookGRData: {
    title: "",
    description: "",
    isbn: "",
    isbn13: "",
    image_url: "",
    small_image_url: "",
    authors: [
      {
        id: "",
        name: "",
        image_url: "",
        small_image_url: ""
      }
    ]
  }
};

BookQuickView.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  bookGRData: PropTypes.object.isRequired,
  populateFields: PropTypes.func.isRequired
};

export default withStyles(styles)(BookQuickView);
