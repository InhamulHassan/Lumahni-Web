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
import { AuthorQuickView, SuggestionsTagChip } from "../../components";

// Shared services
import {
  editAuthor,
  resetEditAuthor,
  getAuthorById
} from "../../redux/actions/authorDbAction";

import {
  getAuthorByGrId,
  resetGetAuthorByGrId
} from "../../redux/actions/authorGrAction";

import { getGenres, resetGetGenres } from "../../redux/actions/genreDbAction";

// Validation Helper
import { htmlCleaner } from "../../helpers";

// Form validation schema
import validateSchema from "./validateSchema";

// Component styles
import styles from "./styles";

class AuthorEditFormComponent extends Component {
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
    // populate the form with the author details that needs to be edited
    this.populateForm();
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: do this by comparing prevprops and this props
    if (prevProps !== this.props) {
      this.props.handleClose();
    }
  }

  componentWillUnmount() {
    this.props.resetGetAuthorByGrId();
    this.props.resetEditAuthor();
    this.props.resetGetGenres();
    // to refresh the authors for the Authors View
    const { id, grid } = this.props.authorData;
    this.props.getAuthorById(id);
    this.props.getAuthorByGrId(grid);
  }

  validateForm = data => {
    const newState = { ...this.state };
    const errors = validate(data, validateSchema);

    newState.errors = errors || false;
    newState.isValid = errors ? false : true;

    this.setState(newState);

    if (!errors) {
      // this.props.editAuthor(data).then(this.props.handleClose());
      this.props.editAuthor(data);
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      id,
      authorName,
      biography,
      grid,
      imgLink,
      imgLargeLink,
      imgThumbnailLink,
      genreTags
    } = this.state;

    const formData = {
      id,
      authorName,
      biography,
      grid,
      imgLink,
      imgLargeLink,
      imgThumbnailLink,
      genreTags
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

  populateForm = () => {
    const {
      id,
      name,
      bio,
      grid,
      img_l,
      img_m,
      img_s,
      genres
    } = this.props.authorData;

    let genreTags = genres || [];

    if (Object.keys(this.props.authorData).length > 0) {
      this.setState({
        id: id,
        authorName: name,
        biography: bio,
        grid: grid,
        imgLink: img_m,
        imgLargeLink: img_l,
        imgThumbnailLink: img_s,
        genreTags: genreTags
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
    if (!genreTagArray.includes(tag)) {
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

  render() {
    const {
      classes,
      className,
      authorData,
      authorDetails,
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
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                Author Information
              </Typography>
              <div className={classes.field}>
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
              <div className={classes.field}>
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
            <div className={classes.group}>
              <Typography className={classes.groupLabel} variant="h6">
                General Details
              </Typography>
              <div className={classes.groupField}>
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
                      <InputAdornment position="end">
                        <IconButton tabIndex="-1" onClick={this.searchByGrid}>
                          {!!authorGrLoading ? (
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
                  {errors.grid && (
                    <Typography className={classes.fieldError} variant="body2">
                      <ErrorIcon className={classes.errorIcon} />
                      {errors.grid[0]}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={classes.groupField}>
                {Object.keys(authorGrDetails).length > 0 &&
                  (!!authorGrLoading ? (
                    <CircularProgress size="2" />
                  ) : (
                    <AuthorQuickView
                      authorGRData={authorGrDetails.author}
                      populateFields={this.populateGrFields}
                    />
                  ))}
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
              <div className={classes.field}>
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
              <div className={classes.field}>
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
          {loading ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <Button color="primary" variant="contained" onClick={this.onSubmit}>
              Edit Author
            </Button>
          )}
        </MainViewFooter>
      </MainView>
    );
  }
}

AuthorEditFormComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

AuthorEditFormComponent.defaultProps = {
  open: false,
  handleClose: () => {},
  genres: {},
  genreLoading: false,
  genreError: "",
  authorGrDetails: {},
  authorGrLoading: false,
  authorGrError: null,
  authorDetails: {},
  loading: false,
  error: null
};

const mapStateToProps = state => {
  return {
    genres: state.genre.data,
    genreLoading: state.genre.dataLoading,
    genreError: state.genre.error,
    authorGrDetails: state.author_gr.authorDetails.data,
    authorGrLoading: state.author_gr.dataLoading,
    authorGrError: state.author_gr.error,
    authorDetails: state.author.data,
    loading: state.author.dataLoading,
    error: state.author.error
  };
};

const mapDispatchToProps = {
  getGenres,
  resetGetGenres,
  editAuthor,
  resetEditAuthor,
  getAuthorById,
  getAuthorByGrId,
  resetGetAuthorByGrId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AuthorEditFormComponent));
