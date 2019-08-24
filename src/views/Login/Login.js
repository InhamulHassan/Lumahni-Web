import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";

// Redux Helpers
import { connect } from "react-redux";

// Material components
import {
  Grid,
  Image,
  CircularProgress,
  Typography,
  withStyles
} from "@material-ui/core";

// Shared components
import { LoginFormComponent } from "../../components";

// Shared services
import { fetchQuote, resetFetchQuote } from "../../redux/actions/quoteAction";
import {
  fetchUnsplashPhoto,
  resetFetchUnsplashPhoto
} from "../../redux/actions/unsplashAction";
import { userLogin, resetUserLogin } from "../../redux/actions/userDbAction";

// Component styles
import styles from "./styles";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomImage: {
        color: "",
        urls: {}
      }
    };
  }

  componentDidMount() {
    // this.props.fetchUnsplashPhoto();
    this.props.fetchQuote();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.authToken !== this.props.authToken && !this.props.loading) {
      this.props.history.push("/home");
    }
  }

  componentWillUnmount() {
    // To persist the user auth details
    this.props.resetUserLogin();
    this.props.resetFetchUnsplashPhoto();
    this.props.resetFetchQuote();
  }

  render() {
    const {
      classes,
      history,
      quoteDetails,
      quoteLoading,
      loading,
      error,
      userLogin
    } = this.props;

    let photoLoading = false;
    let photoDetails = {
      color: "#3d3d3d",
      alt_description:
        "Scattered sheets of white paper covering the entire frame",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjg2ODIwfQ"
      }
    };

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid
            className={classes.quoteRootContainer}
            item
            lg={7}
            md={6}
            xs={12}
          >
            <div className={classes.quoteImageContainer}>
              {photoLoading ? (
                <div className={classes.progressWrapper}>
                  <CircularProgress className={classes.circularProgress} />
                </div>
              ) : (
                <div className={classes.quoteImageWrapper}>
                  <div
                    className={classes.gradientOverlay}
                    style={{
                      backgroundColor: photoDetails.color
                    }}
                  ></div>
                  <img
                    alt={photoDetails.alt_description}
                    className={classes.image}
                    src={photoDetails.urls.regular}
                  />
                </div>
              )}
            </div>
            <div className={classes.quoteWrapper}>
              {quoteLoading ? (
                <div className={classes.progressWrapper}>
                  <CircularProgress className={classes.circularProgress} />
                </div>
              ) : (
                <div>
                  <Typography className={classes.quoteText} variant="h1">
                    {quoteDetails.quote}
                  </Typography>
                  <div className={classes.quoteInner}>
                    <Typography className={classes.quoteAuthor} variant="body1">
                      {quoteDetails.author}
                    </Typography>
                    <Typography
                      className={classes.quotePublication}
                      variant="body2"
                    >
                      {quoteDetails.publication}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <Grid className={classes.contentContainer} item lg={5} md={6} xs={12}>
            <LoginFormComponent
              handleLogin={userLogin}
              authLoading={loading}
              authError={error}
            ></LoginFormComponent>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

Login.defaultProps = {
  quoteDetails: {},
  quoteLoading: false,
  quoteError: null,
  photoDetails: {
    color: "#3d3d3d",
    alt_description:
      "Scattered sheets of white paper covering the entire frame",
    urls: {
      regular:
        "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjg2ODIwfQ"
    }
  },
  photoLoading: false,
  photoError: null
};

const mapStateToProps = state => {
  return {
    quoteDetails: state.quote.quoteDetails,
    quoteLoading: state.quote.dataLoading,
    quoteError: state.quote.error,
    photoDetails: state.unsplash.photoDetails,
    photoLoading: state.unsplash.dataLoading,
    photoError: state.unsplash.error,
    authToken: state.user.authToken,
    loading: state.user.dataLoading,
    error: state.user.error
  };
};

const mapDispatchToProps = {
  fetchQuote,
  resetFetchQuote,
  fetchUnsplashPhoto,
  resetFetchUnsplashPhoto,
  userLogin,
  resetUserLogin
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
)
