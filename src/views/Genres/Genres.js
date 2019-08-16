import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Redux Helpers
import { connect } from "react-redux";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { IconButton, CircularProgress, Typography } from "@material-ui/core";

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Shared services
import {
  getGenres,
  resetGetGenres,
  getGenreBooks,
  resetGetGenreBooks
} from "../../redux/actions/genreDbAction";

// Custom components
import {
  ArrowIconButton,
  BooksTableList,
  GenreEditIcon,
  GenreToolbar,
  GenreCardBar
} from "../../components";

import ReadMoreReact from "read-more-react";

// Shared components
import { MainView, MainViewContent } from "../../components/core";

// React Slick Dependancies
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Component styles
import styles from "./styles";

class Genres extends Component {
  signal = true;

  state = {
    limit: 6,
    genres: [],
    genresTotal: 0,
    selectedGenreId: "1"
  };

  componentDidMount() {
    this.signal = true;
    this.props.getGenres();
    const { selectedGenreId } = this.state;
    this.props.getGenreBooks(selectedGenreId);
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetGenres();
    this.props.resetGetGenreBooks();
  }

  renderGenres() {
    const { classes, genres, loading, error } = this.props;

    const sliderSettings = {
      infinite: true,
      speed: 300,
      slidesToShow: 9,
      slidesToScroll: 3,
      initialSlide: 0,
      nextArrow: <ArrowIconButton isPrev={false} />,
      prevArrow: <ArrowIconButton isPrev={true} />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 2,
            infinite: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <div className={classes.errorWrapper}>{error}</div>;
    }

    if (genres.length === 0) {
      return (
        <Typography className={classes.noResults} variant="h4">
          There are no genres available
        </Typography>
      );
    }

    return (
      <Slider {...sliderSettings}>
        {genres.map((genre, index) => (
          <GenreCardBar
            key={index}
            genre={genre}
            onPress={() => this.selectGenres(genre.id)}
          />
        ))}
      </Slider>
    );
  }

  selectGenres = id => {
    this.setState({ selectedGenreId: id });
    this.props.getGenreBooks(id);
  };

  renderGenreBooks() {
    const { classes, genreBooks, loading, error } = this.props;

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    const genreName = genreBooks.name
      ? genreBooks.name.toString().toLowerCase()
      : "";

    if (!genreBooks.books || genreBooks.books.length === 0) {
      return (
        <Typography className={classes.noResults} variant="h6">
          There are no books found under the {genreName} section
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography className={classes.errorWrapper} variant="h6">
          {error.message}
        </Typography>
      );
    }

    return <BooksTableList books={genreBooks.books} />;
  }

  renderGenreDetails() {
    const { classes, className, genreBooks, loading, error } = this.props;

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (!genreBooks) {
      return (
        <Typography className={classes.noResults} variant="h6">
          No genre listed
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography className={classes.errorWrapper} variant="h6">
          {error}
        </Typography>
      );
    }

    const rootClassName = classNames(classes.rootGenreDetails, className);

    return (
      <MainView className={rootClassName}>
        <MainViewContent className={classes.genreDetailsWrapper} noPadding>
          <div
            className={classes.genreImageWrapper}
            style={{
              background: `url('${genreBooks.img_m}') center/cover no-repeat #cccccc`
            }}
          >
            <div className={classes.genreNameContainer}>
              <Typography className={classes.genreName} variant="h2">
                {genreBooks.name}
              </Typography>
            </div>
          </div>
          <div className={classes.editIconContainer}>
            <GenreEditIcon genreData={genreBooks} />
          </div>
          <div className={classes.genreDescriptionContainer}>
            <Typography
              className={classes.genreDescription}
              variant="body1"
              component="div"
            >
              {genreBooks.descr && (
                <ReadMoreReact
                  text={genreBooks.descr}
                  min={100}
                  ideal={550}
                  max={1000}
                  readMoreText={"read more..."}
                />
              )}
            </Typography>
          </div>
        </MainViewContent>
      </MainView>
    );
  }

  render() {
    const { error, classes } = this.props;

    return (
      <CoreLayout title="Genres">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error}</Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <GenreToolbar />
            <div className={classes.content}>{this.renderGenres()}</div>
            <div className={classes.mainContent}>
              <div className={classes.genreDetailsContainer}>
                {this.renderGenreDetails()}
              </div>
              <div className={classes.bookTableContainer}>
                {this.renderGenreBooks()}
              </div>
            </div>

            <div className={classes.pagination}>
              <Typography variant="caption">1-6 of 20</Typography>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        )}
      </CoreLayout>
    );
  }
}

Genres.propTypes = {
  classes: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired,
  getGenreBooks: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

const mapStateToProps = state => {
  return {
    genres: state.genre.data,
    genreBooks: state.genre.genreBooks,
    loading: state.genre.dataLoading,
    error: state.genre.error
  };
};

const mapDispatchToProps = {
  getGenres,
  resetGetGenres,
  getGenreBooks,
  resetGetGenreBooks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Genres));
