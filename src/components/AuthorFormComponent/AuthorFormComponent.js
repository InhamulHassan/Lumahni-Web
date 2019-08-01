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
import { AuthorQuickView, GenreTagChip } from "../../components";

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
      isValid: true
    };
  }

  componentDidUpdate() {
    if (!!this.props.id) {
      this.props.handleClose();
    }
  }

  componentWillUnmount() {
    this.props.resetGetAuthorByGrId();
    this.props.resetAddAuthor();
    this.props.getAuthors();
  }

  validateForm = data => {
    console.log("data: " + JSON.stringify(data));
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

  populateFields = () => {
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
      loading,
      error,
      authorGrDetails,
      authorGrLoading,
      authorGrError,
    } = this.props;
    const { errors } = this.state;
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
                        <IconButton
                          tabIndex="-1"
                          onClick={this.searchByGrid}
                        >
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
                {Object.keys(authorGrDetails).length > 0 && (
                  !!authorGrLoading ? (
                    <CircularProgress size="2" />
                  ) : (
                    <AuthorQuickView
                      authorGRData={authorGrDetails.author}
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
                  helperText="Please specify the URL for the image of the author"
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
                  name="imgLargeLink"
                  helperText="Please specify the URL for the large image of the author"
                  label="Large Image URL"
                  fullWidth
                  margin="dense"
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
                Author Genres
              </Typography>
              <div className={classes.field}>
                <GenreTagChip />
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
              Add Author
            </Button>
          )}
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
  close: null,
  authorGrDetails: {},
  id: null,
  loading: false,
  error: null
};

const mapStateToProps = state => {
  return {
    id: state.author.authorId,
    loading: state.author.dataLoading,
    error: state.author.error,
    authorGrDetails: state.author_gr.authorDetails.data,
    authorGrLoading: state.author_gr.dataLoading,
    authorGrError: state.author_gr.error
  };
};

const mapDispatchToProps = {
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
