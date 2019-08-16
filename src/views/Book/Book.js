import React, { Component } from "react";
import { Link } from "react-router-dom";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";

// Custom Components
import ReadMoreReact from "read-more-react";
import { ArrowIconButton, BookCardGrid } from "../../components";

// React Slick Dependancies
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Material icons
import { ArrowBackRounded as BackIcon } from "@material-ui/icons";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";
import { MainView, MainViewContent } from "../../components/core";
import { BookEditIcon, GenreChip } from "../../components";

// Shared services
import {
  getBookById,
  resetGetBookById
} from "../../redux/actions/bookDbAction";

import {
  getBookByGrId,
  resetGetBookByGrId
} from "../../redux/actions/bookGrAction";

// Component styles
import styles from "./styles";

class Book extends Component {
  constructor(props) {
    super(props);

    this.signal = true;
  }

  componentDidMount() {
    this.signal = true;
    const { id, grid } = this.props.location.state;
    this.props.getBookById(id);
    this.props.getBookByGrId(grid);
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetBookByGrId();
    this.props.resetGetBookById();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  renderGenres = () => {
    const { classes, bookDetails } = this.props;
    if (!Object.keys(bookDetails).length > 0) return null;

    if (!bookDetails.genres) return null;

    return (
      <div className={classes.genreContainer}>
        {bookDetails.genres.map((genre, index) => (
          <div className="genreChipWrapper" key={index}>
            <GenreChip text={genre.name} />
          </div>
        ))}
      </div>
    );
  };

  renderAuthors = () => {
    const { classes, bookGrDetails } = this.props;
    if (!Object.keys(bookGrDetails).length > 0) return null;

    if (!bookGrDetails.book) return null;

    const length = Object.keys(bookGrDetails.book.authors).length;

    return (
      <div className={classes.authorContainer}>
        {bookGrDetails.book.authors.map((author, index) => (
          <div key={index}>
            <Typography className={classes.authorName} variant="subtitle2">
              {author.name}
              {index < length - 1 ? ", " : ""}
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  renderBookDescription = () => {
    const { classes, bookDetails } = this.props;

    if (!Object.keys(bookDetails).length > 0) return null;

    if (!bookDetails) return null;

    const { descr } = bookDetails;
    return (
      <Typography
        className={classes.description}
        variant="body1"
        component="div"
      >
        <ReadMoreReact
          text={descr}
          min={100}
          ideal={550}
          max={1000}
          readMoreText={"read more..."}
        />
      </Typography>
    );
  };

  renderBookDetails = () => {
    const { classes, bookGrDetails } = this.props;
    if (!Object.keys(bookGrDetails).length > 0) return null;
    if (!bookGrDetails.book) return null;

    const {
      isbn,
      isbn13,
      num_pages,
      publisher,
      publication_year,
      bookDetail
    } = bookGrDetails.book;

    return (
      <div className={classes.bookDetailsContainer}>
        <Typography className={classes.detailsTitle} variant="h4">
          Book Details
        </Typography>
        {this.renderBookDetail(isbn, "ISBN")}
        {this.renderBookDetail(isbn13, "ISBN13")}
        {this.renderBookDetail(num_pages, "Pages")}
        {this.renderBookDetail(publisher, "Publisher")}
        {this.renderBookDetail(publication_year, "Publication Year")}
        {this.renderBookDetail(bookDetail, "Language")}
      </div>
    );
  };

  renderBookDetail = (data, label) => {
    return (
      !!data && (
        <Typography className="bookDetail" variant="subtitle1">
          {label}
          {": "}
          <Typography variant="subtitle2" component="span">
            {data}
          </Typography>
        </Typography>
      )
    );
  };

  renderSimilarBooks() {
    const { classes, bookGrDetails, bookGrLoading, bookGrError } = this.props;

    if (bookGrLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (!Object.keys(bookGrDetails).length > 0) return null;
    if (!bookGrDetails.book) return null;

    const { similar_books } = bookGrDetails.book;

    if (!similar_books) return null;

    const sliderSettings = {
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 3,
      initialSlide: 0,
      nextArrow: <ArrowIconButton isPrev={false} />,
      prevArrow: <ArrowIconButton isPrev={true} />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
            infinite: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
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

    if (bookGrError) {
      return (
        <div className={classes.progressWrapper}>{bookGrError}</div>
      );
    }

    if (similar_books.length !== 0) {
      return (
        <Slider {...sliderSettings}>
          {similar_books.map((book, index) => (
            <Link key={index} className={classes.link} to="#">
              <BookCardGrid bookGr={book} />
            </Link>
          ))}
        </Slider>
      );
    }
  }

  render() {
    const {
      classes,
      className,
      bookDetails,
      loading,
      error,
      bookGrDetails,
      bookGrLoading,
      bookGrError
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <CoreLayout title={bookDetails.title}>
        {error || bookGrError ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">
              {error || bookGrError || ""}
            </Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <Tooltip title="Go Back" aria-label="Go Back">
              <IconButton
                className={classes.backIconButton}
                onClick={this.goBack}
                size="medium"
              >
                <BackIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <div>
              {loading || bookGrLoading ? (
                <div className={classes.progressWrapper}>
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  <MainView className={rootClassName}>
                    <MainViewContent noPadding>
                      <div className={classes.imageWrapper}>
                        <img
                          alt={bookDetails.title}
                          className={classes.image}
                          src={bookDetails.img}
                        />
                      </div>
                      <div className={classes.editIconContainer}>
                        <BookEditIcon bookData={bookDetails} />
                      </div>
                      <div className={classes.bookTitleContainer}>
                        <Typography className={classes.bookTitle} variant="h2">
                          {bookDetails.title}
                        </Typography>
                      </div>
                      <div className={classes.bookAuthors}>
                        {this.renderAuthors()}
                      </div>
                      <div className={classes.bookGenres}>
                        {this.renderGenres()}
                      </div>
                      <div className={classes.bookDescription}>
                        {this.renderBookDescription()}
                      </div>
                    </MainViewContent>
                  </MainView>
                  <MainView className={rootClassName}>
                    <MainViewContent noPadding>
                      <div className={classes.detailsContainer}>
                        {!!bookGrDetails.book && (
                          <div className={classes.bookDetails}>
                            {this.renderBookDetails()}
                          </div>
                        )}
                      </div>
                      <div className={classes.similarBooksContainer}>
                        {!!bookGrDetails.book && (
                          <div>
                            <Typography
                              className={classes.similarBooksTitle}
                              variant="h4"
                            >
                              Similar Books
                            </Typography>
                            {this.renderSimilarBooks()}
                          </div>
                        )}
                      </div>
                    </MainViewContent>
                  </MainView>
                </div>
              )}
            </div>
          </div>
        )}
      </CoreLayout>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired
};

Book.defaultProps = {
  bookDetails: {},
  loading: true,
  error: "",
  bookGrDetails: {},
  bookGrLoading: true,
  bookGrError: ""
};

const mapStateToProps = state => {
  return {
    bookDetails: state.book.bookDetails,
    loading: state.book.dataLoading,
    error: state.book.error,
    bookGrDetails: state.book_gr.bookDetails.data,
    bookGrLoading: state.book_gr.dataLoading,
    bookGrError: state.book_gr.error
  };
};

const mapDispatchToProps = {
  getBookById,
  resetGetBookById,
  getBookByGrId,
  resetGetBookByGrId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Book));
