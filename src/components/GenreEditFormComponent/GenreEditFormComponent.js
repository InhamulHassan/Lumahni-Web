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
  TextField,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

// Material icons
import { ErrorOutlineRounded as ErrorIcon } from "@material-ui/icons";

// Shared components
import {
  MainView,
  MainViewHeader,
  MainViewLabel,
  MainViewContent,
  MainViewFooter
} from "../core";

// Shared services
import {
  editGenre,
  resetEditGenre,
  getGenreById,
  getGenres,
  getGenreBooks
} from "../../redux/actions/genreDbAction";

// Validation Helper
import { htmlCleaner } from "../../helpers";

// Form validation schema
import validateSchema from "./validateSchema";

// Component styles
import styles from "./styles";

class GenreEditFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      genreName: "",
      description: "",
      imgLink: "",
      imgLargeLink: "",
      imgThumbnailLink: "",
      errors: {},
      isValid: true
    };
  }

  componentDidMount() {
    // populate the form with the genre details that needs to be edited
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
    const { id } = this.props.editedDetails;
    this.props.resetEditGenre();
    // to refresh the genres/books for the Genre View
    this.props.getGenres();
    this.props.getGenreBooks(id || "1");
  }

  validateForm = data => {
    const newState = { ...this.state };
    const errors = validate(data, validateSchema);

    newState.errors = errors || false;
    newState.isValid = errors ? false : true;

    this.setState(newState);

    if (!errors) {
      this.props.editGenre(data);
    }
  };

  onSubmit = event => {
    const {
      id,
      genreName,
      description,
      imgLink,
      imgLargeLink,
      imgThumbnailLink
    } = this.state;

    // cleaning the text from stray HTML tags
    var cleanedDescription = htmlCleaner(description);

    const formData = {
      id,
      genreName,
      description: cleanedDescription,
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

  populateForm = () => {
    const { id, name, descr, img_m, img_l, img_s } = this.props.genrePropsData;

    if (Object.keys(this.props.genrePropsData).length > 0) {
      this.setState({
        id: id,
        genreName: name,
        description: descr,
        imgLink: img_m,
        imgLargeLink: img_l,
        imgThumbnailLink: img_s
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
            (Object.keys(errors).length <= 1 ? " error has" : " errors have") +
            " been found"}
        </Typography>
      )
    );
  };

  getErrorMessage = () => {
    const { classes, error } = this.props;

    return (
      error && (
        <Typography className={classes.fieldError} variant="body2">
          <ErrorIcon className={classes.errorIcon} />
          {error}
        </Typography>
      )
    );
  };

  render() {
    const { classes, className, loading } = this.props;

    const { errors } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewHeader>
          <MainViewLabel
            subtitle="Edit genre details"
            title="Modify the details of the Genre"
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
                Genre Information
              </Typography>
              <div className={classes.groupField}>
                <TextField
                  className={classes.textFieldFull}
                  name="genreName"
                  helperText="Please specify the name of the genre"
                  label="Genre Name"
                  fullWidth
                  required
                  value={this.state.genreName}
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              {errors.genreName && (
                <Typography className={classes.fieldError} variant="body2">
                  <ErrorIcon className={classes.errorIcon} />
                  {errors.genreName[0]}
                </Typography>
              )}
              <div className={classes.field}>
                <TextField
                  className={classes.textFieldFull}
                  name="description"
                  helperText="Please specify the description of the genre"
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
          </form>
        </MainViewContent>
        <MainViewFooter className={classes.mainViewFooter}>
          {this.getSubmitErrorMessage()}
          {this.getErrorMessage()}
          <Button color="primary" variant="contained" onClick={this.onSubmit}>
            Edit Genre
          </Button>
        </MainViewFooter>
      </MainView>
    );
  }
}

GenreEditFormComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  genrePropsData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

GenreEditFormComponent.defaultProps = {
  open: false,
  genrePropsData: {},
  editedDetails: {},
  editSuccess: false,
  loading: false,
  error: ""
};

const mapStateToProps = state => {
  return {
    editedDetails: state.genre.genreDetails,
    editSuccess: state.genre.editSuccess,
    loading: state.genre.editLoading,
    error: state.genre.error
  };
};

const mapDispatchToProps = {
  editGenre,
  resetEditGenre,
  getGenreById,
  getGenres,
  getGenreBooks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GenreEditFormComponent));
