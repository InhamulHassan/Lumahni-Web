import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
// import {
//   IconButton,
//   CircularProgress,
//   Grid,
//   Typography
// } from "@material-ui/core";

import { CircularProgress, IconButton } from "@material-ui/core";

// Material icons
import { ArrowBackRounded as BackIcon } from "@material-ui/icons";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Shared services
import {
  getBookById,
  resetGetBookById
} from "../../redux/actions/bookDbAction";

// Component styles
import styles from "./styles";

class Book extends Component {
  constructor(props) {
    super(props);

    this.signal = true;

    this.state = {
      isLoading: false,
      book: {
        bookTitle: "",
        description: "",
        isbn: "",
        isbn13: "",
        grId: "",
        imgLink: "",
        imgThumbnailLink: ""
      },
      error: null
    };
  }

  componentDidMount() {
    this.signal = true;
    const { id } = this.props.match.params;
    this.props.getBookById(id);
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetBookById();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, bookDetails, loading, error } = this.props;

    return (
      <CoreLayout title={bookDetails.title}>
        <div className={classes.root}>
          <IconButton
            className={classes.iconButton}
            onClick={this.goBack}
            size="medium"
          >
            <BackIcon fontSize="small" />
          </IconButton>
          {loading ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.content}>
              <div className={classes.imageWrapper + " image-wrap"}>
                <img
                  alt={bookDetails.title}
                  className={classes.image}
                  src={bookDetails.img}
                />
              </div>
            </div>
          )}
          {error ? (
            <div className={classes.progressWrapper}>error</div>
          ) : (
            <div className={classes.progressWrapper}></div>
          )}
        </div>
      </CoreLayout>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired
};

Book.defaultProps = {
  books: [],
  bookDetails: {},
  loading: true,
  error: ""
};

const mapStateToProps = state => {
  return {
    bookDetails: state.book.bookDetails,
    loading: state.book.dataLoading,
    error: state.book.error
  };
};

const mapDispatchToProps = {
  getBookById,
  resetGetBookById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Book));
