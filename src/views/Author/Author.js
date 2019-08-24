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
  Avatar,
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
import { AuthorEditIcon, GenreChip } from "../../components";

// Shared services
import {
  getAuthorById,
  resetGetAuthorById
} from "../../redux/actions/authorDbAction";

import {
  getAuthorByGrId,
  resetGetAuthorByGrId
} from "../../redux/actions/authorGrAction";

// Component styles
import styles from "./styles";

class Author extends Component {
  constructor(props) {
    super(props);

    this.signal = true;
  }

  componentDidMount() {
    this.signal = true;
    const { id, grid } = this.props.location.state;
    this.props.getAuthorById(id);
    this.props.getAuthorByGrId(grid);
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetAuthorById();
    this.props.resetGetAuthorByGrId();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  renderGenres = () => {
    const { classes, authorDetails } = this.props;
    if (!Object.keys(authorDetails).length > 0) return null;

    if (!authorDetails.genres) return null;

    return (
      <div className={classes.genreContainer}>
        {authorDetails.genres.map((genre, index) => (
          <div className="genreChipWrapper" key={index}>
            <GenreChip text={genre.name} />
          </div>
        ))}
      </div>
    );
  };

  renderAuthorBiography = () => {
    const { classes, authorDetails } = this.props;

    if (!Object.keys(authorDetails).length > 0) return null;

    if (!authorDetails) return null;

    const { bio } = authorDetails;
    return (
      <Typography className={classes.biography} variant="body1" component="div">
        <ReadMoreReact
          text={bio}
          min={100}
          ideal={550}
          max={1000}
          readMoreText={"read more..."}
        />
      </Typography>
    );
  };

  renderAuthorDetails = () => {
    const { classes, authorGrDetails } = this.props;
    if (!Object.keys(authorGrDetails).length > 0) return null;
    if (!authorGrDetails.author) return null;

    const {
      isbn,
      isbn13,
      num_pages,
      publisher,
      publication_year,
      bookDetail
    } = authorGrDetails.author;

    return (
      <div className={classes.authorDetailsContainer}>
        <Typography className={classes.detailsTitle} variant="h4">
          Author Details
        </Typography>
        {this.renderAuthorDetail(isbn, "ISBN")}
        {this.renderAuthorDetail(isbn13, "ISBN13")}
        {this.renderAuthorDetail(num_pages, "Pages")}
        {this.renderAuthorDetail(publisher, "Publisher")}
        {this.renderAuthorDetail(publication_year, "Publication Year")}
        {this.renderAuthorDetail(bookDetail, "Language")}
      </div>
    );
  };

  renderAuthorDetail = (data, label) => {
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

  renderAuthorBooks() {
    const {
      classes,
      authorGrDetails,
      authorGrLoading,
      authorGrError
    } = this.props;

    if (authorGrLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (!Object.keys(authorGrDetails).length > 0) return null;
    if (!authorGrDetails.author) return null;

    const { books } = authorGrDetails.author;

    if (!books) return null;

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

    if (authorGrError) {
      return <div className={classes.progressWrapper}>{authorGrError}</div>;
    }

    if (books.length !== 0) {
      return (
        <Slider {...sliderSettings}>
          {books.map((book, index) => (
            <Link key={index} className={classes.link} to="#">
              <BookCardGrid authorBookGr={book} />
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
      authorDetails,
      loading,
      error,
      authorGrDetails,
      authorGrLoading,
      authorGrError
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <CoreLayout title={authorDetails.name}>
        {error || authorGrError ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error || authorGrError || ""}</Typography>
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
              {loading || authorGrLoading ? (
                <div className={classes.progressWrapper}>
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  <MainView className={rootClassName}>
                    <MainViewContent noPadding>
                      <Avatar
                        alt={authorDetails.name}
                        src={authorDetails.img_m}
                        className={classes.authorAvatar}
                      />
                      <div className={classes.editIconContainer}>
                        <AuthorEditIcon authorData={authorDetails} />
                      </div>
                      <div className={classes.authorNameContainer}>
                        <Typography className={classes.authorName} variant="h2">
                          {authorDetails.name}
                        </Typography>
                      </div>
                      <div className={classes.authorGenres}>
                        {this.renderGenres()}
                      </div>
                      <div className={classes.authorBiography}>
                        {this.renderAuthorBiography()}
                      </div>
                    </MainViewContent>
                  </MainView>
                  <MainView className={rootClassName}>
                    <MainViewContent noPadding>
                      <div className={classes.detailsContainer}>
                        {!!authorGrDetails.author && (
                          <div className={classes.authorDetails}></div>
                        )}
                      </div>
                      <div className={classes.authorBooksContainer}>
                        {!!authorGrDetails.author && (
                          <div>
                            <Typography
                              className={classes.authorBooksTitle}
                              variant="h4"
                            >
                              Books by {authorDetails.name}
                            </Typography>
                            {this.renderAuthorBooks()}
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

Author.propTypes = {
  classes: PropTypes.object.isRequired
};

Author.defaultProps = {
  authorDetails: {},
  loading: true,
  error: "",
  authorGrDetails: {},
  authorGrLoading: true,
  authorGrError: ""
};

const mapStateToProps = state => {
  return {
    authorDetails: state.author.authorDetails,
    loading: state.author.dataLoading,
    error: state.author.error,
    authorGrDetails: state.author_gr.authorDetails,
    authorGrLoading: state.author_gr.dataLoading,
    authorGrError: state.author_gr.error
  };
};

const mapDispatchToProps = {
  getAuthorById,
  resetGetAuthorById,
  getAuthorByGrId,
  resetGetAuthorByGrId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Author));
