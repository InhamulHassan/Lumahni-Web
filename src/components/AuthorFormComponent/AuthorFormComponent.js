import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";
import validate from "validate.js";

// Material components, helpers
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
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
import { AuthorQuickView, SuggestionsTagChip } from "../../components";

// Shared services
import {
  addAuthor,
  resetAddAuthor,
  getAuthors
} from "../../redux/actions/authorDbAction";

import {
  getAuthorByGrId,
  resetGetAuthorByGrId
} from "../../redux/actions/authorGrAction";

import { getGenres, resetGetGenres } from "../../redux/actions/genreDbAction";

// Component styles
import styles from "./styles";

// Validation Helper
import { htmlCleaner } from "../../helpers";

// Form validation schema
import validateSchema from "./validateSchema";

class AuthorFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorGrDetails: {},
      authorName: "",
      biography: "",
      grid: "",
      imgLink: "",
      imgLargeLink: "",
      imgThumbnailLink: "",
      errors: {},
      isValid: true,
      genreTags: [],
      genreSuggesions: [],
      genreTagsPopulated: false
    };
  }

  componentDidMount() {
    // get all the genres to populate the genre tag suggestion field
    this.props.getGenres();
  }

  componentDidUpdate() {
    if (!!this.props.id) {
      this.props.handleClose();
    }
  }

  componentWillUnmount() {
    this.props.resetGetAuthorByGrId();
    this.props.resetAddAuthor();
    this.props.resetGetGenres();
    // to refresh the authors for the Authors View
    this.props.getAuthors();
  }

  validateForm = data => {
    const newState = { ...this.state };
    const errors = validate(data, validateSchema);

    newState.errors = errors || false;
    newState.isValid = errors ? false : true;

    this.setState(newState);

    if (!errors) {
      this.props.addAuthor(data);
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      authorName,
      biography,
      grid,
      imgLink,
      imgLargeLink,
      imgThumbnailLink
    } = this.state;

    const formData = {
      authorName,
      biography,
      grid,
      imgLink,
      imgLargeLink,
      imgThumbnailLink
    };

    this.validateForm(formData);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  searchByGrid = () => {
    this.props.getAuthorByGrId(this.state.grid);
  };

  populateGrFields = () => {
    const {
      name,
      about,
      image_url,
      large_image_url,
      small_image_url
    } = this.props.authorGrDetails.author;

    // cleaning the text from stray HTML tags
    var cleanedBiography = htmlCleaner(about);

    if (Object.keys(this.props.authorGrDetails).length > 0) {
      this.setState({
        authorName: name,
        biography: cleanedBiography,
        imgLink: image_url,
        imgLargeLink: large_image_url,
        imgThumbnailLink: small_image_url
      });
    } else {
      return null;
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
    if (!genreTagArray.find(item => item.id === tag.id)) {
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

  renderAuthorQuickView = () => {
    const {
      classes,
      authorGrDetails,
      authorGrLoading,
      authorGrError
    } = this.props;

    if (authorGrLoading) {
      return (
        <div className={classes.quickViewProgressWrapper}>
          <CircularProgress size={40} />
        </div>
      );
    }

    // the statement after && is risky better find an alternative (to not show error when similar_books is null)
    if (authorGrError && !Object.keys(authorGrDetails).length > 0) {
      return <div className={classes.errorWrapper}>{authorGrError}</div>;
    }

    // the statement after && is risky better find an alternative (to not show error when similar_books is null)
    if (authorGrError && authorGrDetails.author == null) {
      return <div className={classes.errorWrapper}>{authorGrError}</div>;
    }

    if (Object.keys(authorGrDetails).length > 0) {
      return (
        <AuthorQuickView
          authorGRData={authorGrDetails.author}
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
      error,
      authorGrDetails,
      authorGrLoading,
      authorGrError
    } = this.props;
    const { errors, genreTags, genreSuggesions } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel
            subtitle="Add the details of the author"
            title="Add a New Author"
          />
        </MainViewHeader>
        <MainViewContent noPadding>
          <form className={classes.form} onSubmit={this.onSubmit}>
            {loading && (
              <div className={classes.progressContainer}>
                <CircularProgress size={100} />
              </div>
            )}
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Author Information
              </Typography>
              <div className={classes.textFieldWrapper}>
                <TextField
                  className={classes.textFieldFull}
                  name="authorName"
                  helperText="Please specify the full name of the author"
                  label="Author Name"
                  fullWidth
                  required
                  value={this.state.authorName}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.authorName && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.authorName[0]}
                </Typography>
              )}
              <div className={classes.textFieldWrapper}>
                <TextField
                  className={classes.textFieldFull}
                  name="biography"
                  helperText="Please give a description about the author"
                  label="About"
                  fullWidth
                  multiline
                  required
                  rows="4"
                  value={this.state.biography}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.biography && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.biography[0]}
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
                    name="grid"
                    label="Goodreads Author ID"
                    helperText="Please specify the Goodreads ID of the author"
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
                          {authorGrLoading ? (
                            <CircularProgress size={20} />
                          ) : (
                            <IconButton tabIndex="-1" onClick={this.searchByGrid}>
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
              <div className={classes.authorQuickViewWrapper}>
                {this.renderAuthorQuickView()}
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
                  helperText="Please specify the URL for the image of the author"
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
                  name="imgLargeLink"
                  helperText="Please specify the URL for the large image of the author"
                  label="Large Image URL"
                  fullWidth
                  value={this.state.imgLargeLink}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.imgLargeLink && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.imgLargeLink[0]}
                </Typography>
              )}
              <div className={classes.textFieldWrapper}>
                <TextField
                  className={classes.textFieldFull}
                  name="imgThumbnailLink"
                  helperText="Please specify the URL for the thumbnail image of the author"
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
                Author Genres
              </Typography>
              <div className={classes.field}>
                <SuggestionsTagChip
                  tags={genreTags}
                  suggesions={genreSuggesions}
                  handleTagDelete={this.handleGenreTagDelete}
                  handleTagAddition={this.handleGenreTagAddition}
                  handleTagFocus={this.handleGenreTagFocus}
                />
              </div>
            </div>
          </form>
          {(error || authorGrError) && (
            <div className={classes.errorWrapper}>
              {error || ""}
              {authorGrError || ""}
            </div>
          )}
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          {this.getSubmitErrorMessage()}
          {this.getErrorMessage()}
          <Button color="primary" variant="contained" onClick={this.onSubmit}>
            Add Author
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

AuthorFormComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

AuthorFormComponent.defaultProps = {
  open: false,
  handleClose: () => {},
  genres: {},
  genreLoading: false,
  genreError: "",
  authorGrDetails: {},
  authorGrLoading: false,
  authorGrError: null,
  id: "",
  loading: false,
  error: null
};

const mapStateToProps = state => {
  return {
    genres: state.genre.data,
    genreLoading: state.genre.dataLoading,
    genreError: state.genre.error,
    id: state.author.authorId,
    loading: state.author.dataLoading,
    error: state.author.error,
    authorGrDetails: state.author_gr.authorDetails,
    authorGrLoading: state.author_gr.dataLoading,
    authorGrError: state.author_gr.error
  };
};

const mapDispatchToProps = {
  getGenres,
  resetGetGenres,
  addAuthor,
  resetAddAuthor,
  getAuthors,
  getAuthorByGrId,
  resetGetAuthorByGrId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AuthorFormComponent));
