import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";
import validate from "validate.js";

// Material components, helpers
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

// Material icons
import {
  ErrorOutlineRounded as ErrorIcon,
  SearchRounded as SearchIcon
} from "@material-ui/icons";

// Shared components
import {
  MainView,
  MainViewHeader,
  MainViewLabel,
  MainViewContent,
  MainViewFooter
} from "../core";

// Custom components
import { BookQuickView, GenreTagChip } from "../../components";

// Shared services
import {
  editBook,
  resetEditBook,
  getBookById
} from "../../redux/actions/bookDbAction";

import {
  getBookByGrId,
  resetGetBookByGrId
} from "../../redux/actions/bookGrAction";

// Component styles
import styles from "./styles";

// Validation Helper
import { htmlCleaner, validateISBN } from "../../helpers";

// Form validation schema
import validateSchema from "./validateSchema";

class BookFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookGrDetails: {},
      id: "",
      bookTitle: "",
      description: "",
      isbn: "",
      isbn13: "",
      grid: "",
      imgLink: "",
      imgThumbnailLink: "",
      errors: {},
      isValid: true
    };
  }

  componentDidMount() {
    this.populateForm();
  }

  // componentDidUpdate() {
  //   if (!!this.props.id) {
  //     this.props.handleClose();
  //   }
  // }

  componentWillUnmount() {
    this.props.resetGetBookByGrId();
    this.props.resetEditBook();
    const { id, grid } = this.props.bookData;
    this.props.getBookById(id);
    this.props.getBookByGrId(grid);
  }

  validateForm = data => {
    const newState = { ...this.state };
    const errors = validate(data, validateSchema);
    const validIsbn = validateISBN(data);

    newState.errors = errors || false;
    newState.isValid = errors ? false : true;

    this.setState(newState);

    if (!errors && validIsbn) {
      this.props.editBook(data).then(this.props.handleClose());
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      id,
      bookTitle,
      description,
      isbn,
      isbn13,
      grid,
      imgLink,
      imgThumbnailLink
    } = this.state;

    const formData = {
      id,
      bookTitle,
      description,
      isbn,
      isbn13,
      grid,
      imgLink,
      imgThumbnailLink
    };

    this.validateForm(formData);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validateISBNInput = e => {
    e.target.value = e.target.value.replace(/[^0-9Xx]/g, "");
  };

  searchByGrid = () => {
    this.props.getBookByGrId(this.state.grid);
  };

  populateFields = () => {
    const {
      title,
      description,
      isbn,
      isbn13,
      image_url,
      small_image_url
    } = this.props.bookGrDetails.book;

    // cleaning the text from stray HTML tags
    var cleanedDescription = htmlCleaner(description);

    if (Object.keys(this.props.bookGrDetails).length > 0) {
      this.setState({
        bookTitle: title,
        description: cleanedDescription,
        isbn: isbn,
        isbn13: isbn13,
        imgLink: image_url,
        imgThumbnailLink: small_image_url
      });
    } else {
      return null;
    }
  };

  populateForm = () => {
    const {
      id,
      title,
      descr,
      grid,
      isbn,
      isbn13,
      img,
      img_thumbnail
    } = this.props.bookData;

    console.log(JSON.stringify(this.props.bookData));

    if (Object.keys(this.props.bookData).length > 0) {
      this.setState({
        id: id,
        bookTitle: title,
        description: descr,
        isbn: isbn,
        isbn13: isbn13,
        grid: grid,
        imgLink: img,
        imgThumbnailLink: img_thumbnail
      });
    }
  };

  getSubmitErrorMessage = () => {
    const { isValid, errors } = this.state;
    const { classes } = this.props;

    return (
      !isValid && (
        <Typography className={classes.fieldError} variant="body2">
          <ErrorIcon className={classes.errorIcon} />
          {Object.keys(errors).length +
            (Object.keys(errors).length <= 1 ? " error" : " errors") +
            " has been found"}
        </Typography>
      )
    );
  };

  render() {
    const {
      classes,
      className,
      bookData,
      editBook,
      resetEditBook,
      getBookById,
      resetGetBookById,
      getBookByGrId,
      resetGetBookByGrId,
      handleClose,
      bookDetails,
      loading,
      error,
      bookGrDetails,
      bookGrLoading,
      bookGrError,
      ...rest
    } = this.props;
    const { errors } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <MainView {...rest} className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel
            subtitle="Modify the details of the book"
            title="Edit Book Details"
          />
        </MainViewHeader>
        <MainViewContent noPadding>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Book Information
              </Typography>
              <div className={classes.field}>
                <TextField
                  className={classes.textFieldFull}
                  name="bookTitle"
                  helperText="Please specify the title of the book"
                  label="Book Title"
                  fullWidth
                  required
                  value={this.state.bookTitle}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.bookTitle && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.bookTitle[0]}
                </Typography>
              )}
              <div className={classes.field}>
                <TextField
                  className={classes.textFieldFull}
                  name="description"
                  helperText="Please specify the description/summary of the book"
                  label="Description"
                  fullWidth
                  multiline
                  required
                  rows="4"
                  value={this.state.description}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.description && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.description[0]}
                </Typography>
              )}
            </div>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                General Details
              </Typography>
              <div className={classes.groupField}>
                <TextField
                  className={classes.textField}
                  name="isbn"
                  label="ISBN"
                  helperText="Please specify the 10-digit ISBN number of the book"
                  type="text"
                  required
                  inputProps={{ maxLength: 10 }}
                  onInput={this.validateISBNInput}
                  value={this.state.isbn}
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <TextField
                  className={classes.textField}
                  name="isbn13"
                  label="ISBN13"
                  helperText="Please specify the 13-digit ISBN13 number of the book"
                  type="text"
                  inputProps={{ maxLength: 13 }}
                  onInput={this.validateISBNInput}
                  value={this.state.isbn13}
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <TextField
                  className={classes.textField}
                  name="grid"
                  label="Goodreads Book ID"
                  helperText="Please specify the Goodreads ID of the book"
                  type="text"
                  value={this.state.grid}
                  variant="outlined"
                  onChange={this.handleChange}
                  onInput={e => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  InputProps={{
                    endAdornment: !!this.state.grid ? (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex="-1"
                          onClick={this.searchByGrid}
                        >
                          {bookGrLoading ? (
                            <CircularProgress size="2" />
                          ) : (
                            <SearchIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  }}
                />
              </div>
              <div className={classes.groupField}>
                <div className={classes.errorFieldContainer}>
                  {errors.isbn && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.isbn[0]}
                    </Typography>
                  )}
                </div>
                <div className={classes.errorFieldContainer}>
                  {errors.isbn13 && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.isbn13[0]}
                    </Typography>
                  )}
                </div>
                <div className={classes.errorFieldContainer}>
                  {errors.grid && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.grid[0]}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={classes.groupField}>
                {Object.keys(bookGrDetails).length > 0 && (
                  !!bookGrLoading ? (
                    <CircularProgress size="2" />
                  ) : (
                    <BookQuickView
                      bookGRData={bookGrDetails.book}
                      populateFields={this.populateFields}
                    />
                  )
                )}
              </div>
            </div>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Image Links
              </Typography>
              <div className={classes.field}>
                <TextField
                  className={classes.textFieldFull}
                  name="imgLink"
                  helperText="Please specify the URL for the image of the book cover"
                  label="Image URL"
                  fullWidth
                  margin="dense"
                  value={this.state.imgLink}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.imgLink && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.imgLink[0]}
                </Typography>
              )}
              <div className={classes.field}>
                <TextField
                  className={classes.textFieldFull}
                  name="imgThumbnailLink"
                  helperText="Please specify the URL for the thumbnail image of the book cover"
                  label="Thumbnail Image URL"
                  fullWidth
                  margin="dense"
                  value={this.state.imgThumbnailLink}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.imgThumbnailLink && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.imgThumbnailLink[0]}
                </Typography>
              )}
            </div>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Book Genres
              </Typography>
              <div className={classes.field}>
                <GenreTagChip />
              </div>
            </div>
          </form>
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          {this.getSubmitErrorMessage()}
          {loading ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <Button color="primary" variant="contained" onClick={this.onSubmit}>
              Save Changes
            </Button>
          )}
        </MainViewFooter>
      </MainView>
    );
  }
}

BookFormComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bookData: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    bookDetails: state.book.data,
    loading: state.book.dataLoading,
    error: state.book.error,
    bookGrDetails: state.book_gr.bookDetails.data,
    bookGrLoading: state.book_gr.dataLoading,
    bookGrError: state.book_gr.error
  };
};

const mapDispatchToProps = {
  editBook,
  resetEditBook,
  getBookById,
  getBookByGrId,
  resetGetBookByGrId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BookFormComponent));
