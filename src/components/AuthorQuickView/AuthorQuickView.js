import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Button, Tooltip, Typography, withStyles } from "@material-ui/core";

// Shared components
import { MainView } from "../core";

// Component styles
import styles from "./styles";

class AuthorQuickView extends Component {
  renderBooks() {
    const { classes, authorGRData } = this.props;

    if (!Object.keys(authorGRData).length > 0) return null;

    return (
      <div className={classes.gridContainer}>
        {authorGRData.books.map(book => (
          <div key={book.id} className={classes.bookContainer}>
            <Tooltip title={book.title} aria-label={book.title}>
              <Typography
                className={classes.book}
                variant="body1"
              >
                {book.title}
              </Typography>
            </Tooltip>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      classes,
      className,
      authorGRData,
      populateFields,
      ...rest
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <div className={classes.details}>
          <div className={classes.imageWrapper}>
            <img
              alt={authorGRData.name}
              className={classes.image}
              src={authorGRData.image_url}
            />
          </div>
          <Typography className={classes.name} variant="h3">
            {authorGRData.name}
          </Typography>
        </div>
        <div className={classes.info}>
          <div className={classes.books}>
            {Object.keys(authorGRData).length > 0 ? "Books:" : ""}
            {this.renderBooks()}
          </div>
        </div>
        <Button color="primary" variant="contained" onClick={populateFields}>
          Populate Fields
        </Button>
      </MainView>
    );
  }
}

AuthorQuickView.defaultProps = {
  authorGRData: {
    name: "",
    about: "",
    image_url: "",
    large_image_url: "",
    small_image_url: "",
    books: [
      {
        id: "",
        title: ""
      }
    ]
  }
};

AuthorQuickView.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  authorGRData: PropTypes.object.isRequired,
  populateFields: PropTypes.func.isRequired
};

export default withStyles(styles)(AuthorQuickView);
