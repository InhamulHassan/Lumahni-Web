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
import { BookQuickView, SuggestionsTagChip } from "../../components";

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

import {
  getAuthors,
  resetGetAuthors
} from "../../redux/actions/authorDbAction";

import { getGenres, resetGetGenres } from "../../redux/actions/genreDbAction";

// Validation Helper
import { htmlCleaner, validateISBN } from "../../helpers";

// Form validation schema
import validateSchema from "./validateSchema";

// Component styles
import styles from "./styles";

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
      isValid: true,
      genreTags: [],
      genreSuggesions: [],
      genreTagsPopulated: false,
      authorTags: [],
      authorSuggesions: [],
      authorTagsPopulated: false
    };
  }

  componentDidMount() {
    // get all the genres/authors to populate the tag suggestion field
    this.props.getGenres();
    this.props.getAuthors();
    // populate the form with the book details that needs to be edited
    this.populateForm();
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: do this by comparing prevprops and this props
    if (prevProps.editSuccess !== this.props.editSuccess) {
      this.props.handleClose();
    }
  }
  componentWillUnmount() {
    // get the id/grid before reset
    const { id, grid } = this.props.editedDetails;
    this.props.resetGetBookByGrId();
    this.props.resetGetAuthors();
    this.props.resetGetGenres();
    this.props.resetEditBook();
    // to refresh the book data for the Book View
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
      this.props.editBook(data);
    }
  };

  onSubmit = event => {
    const {
      id,
      bookTitle,
      description,
      isbn,
      isbn13,
      grid,
      imgLink,
      imgThumbnailLink,
      genreTags,
      authorTags
    } = this.state;

    // cleaning the text from stray HTML tags
    var cleanedDescription = htmlCleaner(description);

    const formData = {
      id,
      bookTitle,
      description: cleanedDescription,
      isbn,
      isbn13,
      grid,
      imgLink,
      imgThumbnailLink,
      genreTags,
      authorTags
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

  populateGrFields = () => {
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
      img_thumbnail,
      genres,
      authors
    } = this.props.bookPropsData;

    let genreTags = genres || [];
    let authorTags = authors || [];

    if (Object.keys(this.props.bookPropsData).length > 0) {
      this.setState({
        id: id,
        bookTitle: title,
        description: descr,
        isbn: isbn,
        isbn13: isbn13,
        grid: grid,
        imgLink: img,
        imgThumbnailLink: img_thumbnail,
        genreTags: genreTags,
        authorTags: authorTags
      });
    }
  };

  // Genre Tags Functions
  handleGenreTagDelete = i => {
    const genreTags = this.state.genreTags.slice(0);
    genreTags.splice(i, 1);
    this.setState({ genreTags });
  };

  handleGenreTagAddition = tag => {
    const genreTagArray = this.state.genreTags;
    if (!genreTagArray.find(item => item.id === tag.id))  {
      const genreTags = [].concat(genreTagArray, tag);
      this.setState({ genreTags });
    }
  };

  handleGenreTagFocus = () => {
    if (!this.state.genreTagsPopulated) {
      this.populateGenreSuggestions();
    }
  };

  populateGenreSuggestions = () => {
    const { genres, genreLoading } = this.props;
    let genreSuggesions = [];
    for (var i = 0; i < genres.length; ++i) {
      genreSuggesions.push({ id: genres[i]["id"], name: genres[i]["name"] });
    }

    if (
      !genreLoading &&
      genreSuggesions.length > 0 &&
      this.state.genreSuggesions.length === 0
    ) {
      this.setState({ genreSuggesions, genreTagsPopulated: true });
    }
  };

  // Author Tags Functions
  handleAuthorTagDelete = i => {
    const authorTags = this.state.authorTags.slice(0);
    authorTags.splice(i, 1);
    this.setState({ authorTags });
  };

  handleAuthorTagAddition = tag => {
    const authorTagArray = this.state.authorTags;
    if (!authorTagArray.find(item => item.id === tag.id))  {
      const authorTags = [].concat(authorTagArray, tag);
      this.setState({ authorTags });
    }
  };

  handleAuthorTagFocus = () => {
    if (!this.state.authorTagsPopulated) {
      this.populateAuthorSuggestions();
    }
  };

  populateAuthorSuggestions = () => {
    const { authors, authorLoading } = this.props;
    let authorSuggesions = [];
    for (var i = 0; i < authors.length; ++i) {
      authorSuggesions.push({ id: authors[i]["id"], name: authors[i]["name"] });
    }

    if (
      !authorLoading &&
      authorSuggesions.length > 0 &&
      this.state.authorSuggesions.length === 0
    ) {
      this.setState({ authorSuggesions, authorTagsPopulated: true });
    }
  };

  renderBookQuickView = () => {
    const { classes, bookGrDetails, bookGrLoading, bookGrError } = this.props;

    if (bookGrLoading) {
      return (
        <div className={classes.quickViewProgressWrapper}>
          <CircularProgress size={40} />
        </div>
      );
    }

    // the statement after && is risky better find an alternative (to not show error when similar_books is null)
    if (bookGrError && !Object.keys(bookGrDetails).length > 0) {
      return <div className={classes.errorWrapper}>{bookGrError}</div>;
    }

    // the statement after && is risky better find an alternative (to not show error when similar_books is null)
    if (bookGrError && bookGrDetails.book == null) {
      return <div className={classes.errorWrapper}>{bookGrError}</div>;
    }

    if (Object.keys(bookGrDetails).length > 0) {
      return (
        <BookQuickView
          bookGRData={bookGrDetails.book}
          populateFields={this.populateGrFields}
        />
      );
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
            (Object.keys(errors).length <= 1 ? " error has" : " errors have") +
            " been found"}
        </Typography>
      )
    );
  };

  getErrorMessage = () => {
    const { classes, error, bookGrError } = this.props;

    if (error || bookGrError) {
      return (
        <Typography className={classes.fieldError} variant="body2">
          <ErrorIcon className={classes.errorIcon} />
          {error || bookGrError}
        </Typography>
      );
    }
  };

  render() {
    const {
      classes,
      className,
      loading,
      bookGrDetails,
      bookGrLoading
    } = this.props;

    const {
      errors,
      genreTags,
      genreSuggesions,
      authorTags,
      authorSuggesions
    } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel
            subtitle="Modify the details of the book"
            title="Edit Book Details"
          />
        </MainViewHeader>
        <MainViewContent noPadding>
          <form className={classes.form}>
            {loading && (
              <div className={classes.progressContainer}>
                <CircularProgress size={100} />
              </div>
            )}
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Book Information
              </Typography>
              <div className={classes.textFieldWrapper}>
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
              <div className={classes.textFieldWrapper}>
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
            <div className={classes.generalGroup}>
              <Typography className={classes.groupLabel} variant="h6">
                General Details
              </Typography>
              <div className={classes.generalGroupField}>
                <div className={classes.textFieldWrapper}>
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
                  {errors.isbn && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.isbn[0]}
                    </Typography>
                  )}
                </div>
                <div className={classes.textFieldWrapper}>
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
                  {errors.isbn13 && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.isbn13[0]}
                    </Typography>
                  )}
                </div>
                <div className={classes.textFieldWrapper}>
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
                        <InputAdornment
                          position="end"
                          className={classes.searchInputAdornment}
                        >
                          {bookGrLoading ? (
                            <CircularProgress size={20} />
                          ) : (
                            <IconButton
                              tabIndex="-1"
                              onClick={this.searchByGrid}
                            >
                              <SearchIcon />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ) : null
                    }}
                  />
                  {errors.grid && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.grid[0]}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={classes.bookQuickViewWrapper}>
                {this.renderBookQuickView()}
              </div>
            </div>
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Image Links
              </Typography>
              <div className={classes.textFieldWrapper}>
                <TextField
                  className={classes.textFieldFull}
                  name="imgLink"
                  helperText="Please specify the URL for the image of the book cover"
                  label="Image URL"
                  fullWidth
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
              <div className={classes.textFieldWrapper}>
                <TextField
                  className={classes.textFieldFull}
                  name="imgThumbnailLink"
                  helperText="Please specify the URL for the thumbnail image of the book cover"
                  label="Thumbnail Image URL"
                  fullWidth
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
              <div className={classes.textFieldWrapper}>
                <SuggestionsTagChip
                  tags={genreTags}
                  suggesions={genreSuggesions}
                  handleTagDelete={this.handleGenreTagDelete}
                  handleTagAddition={this.handleGenreTagAddition}
                  handleTagFocus={this.handleGenreTagFocus}
                  placeholder="Add new Genres"
                />
              </div>
              <Typography className={classes.groupLabel} variant="h6">
                Book Authors
              </Typography>
              <div className={classes.textFieldWrapper}>
                <SuggestionsTagChip
                  tags={authorTags}
                  suggesions={authorSuggesions}
                  handleTagDelete={this.handleAuthorTagDelete}
                  handleTagAddition={this.handleAuthorTagAddition}
                  handleTagFocus={this.handleAuthorTagFocus}
                  placeholder="Add new Authors"
                />
              </div>
            </div>
          </form>
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          {this.getSubmitErrorMessage()}
          {this.getErrorMessage()}
          <Button color="primary" variant="contained" onClick={this.onSubmit}>
            Save Changes
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

BookFormComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  bookPropsData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

BookFormComponent.defaultProps = {
  open: false,
  bookData: {},
  authors: [],
  authorLoading: false,
  authorError: null,
  genres: [],
  genreLoading: false,
  genreError: "",
  bookGrDetails: {},
  bookGrLoading: false,
  bookGrError: null,
  editSuccess: false,
  editedDetails: {},
  loading: false,
  error: null
};

const mapStateToProps = state => {
  return {
    authors: state.author.data,
    authorLoading: state.author.dataLoading,
    authorError: state.author.error,
    genres: state.genre.data,
    genreLoading: state.genre.dataLoading,
    genreError: state.genre.error,
    bookGrDetails: state.book_gr.bookDetails,
    bookGrLoading: state.book_gr.dataLoading,
    bookGrError: state.book_gr.error,
    editSuccess: state.book.editSuccess,
    editedDetails: state.book.bookDetails,
    loading: state.book.editLoading,
    error: state.book.error
  };
};

const mapDispatchToProps = {
  getAuthors,
  resetGetAuthors,
  getGenres,
  resetGetGenres,
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
